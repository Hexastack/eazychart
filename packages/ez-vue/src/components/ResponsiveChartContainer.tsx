import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch, ProvideReactive } from 'vue-property-decorator';
import { Dimensions } from 'eazychart-core/src/types';
import {
  debounce,
  defaultChartDimensions,
} from 'eazychart-core/src';

@Component
export default class ResponsiveChartContainer extends Vue {
  private resizeObserver!: ResizeObserver;

  @Prop({
    type: Function as PropType<(dimensions: Dimensions) => void>,
  })
  private readonly onResize?: (dimensions: Dimensions) => void;

  private containerDimensions: Dimensions = {
    width: 0,
    height: 0,
  };

  @ProvideReactive('responsiveContainer')
  private parentDimensions: Dimensions = this.containerDimensions

  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  created() {
    this.containerDimensions = {
      width: this.parentDimensions?.width || defaultChartDimensions.width,
      height: this.parentDimensions?.height || defaultChartDimensions.height,
    };
  }

  mounted() {
    // Dimensions values has not been set, we need to observe and resize
    const observer = new ResizeObserver(
      debounce((entries: ResizeObserverEntry[]) => {
        this.resizeChart(entries);
      }, 100),
    );
    const chartRef = this.$refs.responsiveChartContainer as Node;
    observer.observe(chartRef as Element, {
      box: 'border-box',
    });
  }

  @Watch('containerDimensions')
  onContainerDimensionsChange() {
    this.parentDimensions = this.containerDimensions;
  }

  resizeChart(entries: ResizeObserverEntry[]) {
    entries.forEach((entry) => {
      // We set the dimensions as provided in the props. Otherwise, we set the parent dimensions.
      // At last, if width / height are equal to zero we default the dimensions
      // so that the end-user would be able to see the chart.
      const newDimensions = {
        width:
          this.parentDimensions?.width
          || Math.floor(entry.contentRect.width)
          || defaultChartDimensions.width,
        height:
          this.parentDimensions?.height
          || Math.floor(entry.contentRect.height)
          || defaultChartDimensions.height,
      };
      this.containerDimensions = newDimensions;
      this.onResize && this.onResize(newDimensions);
    });
  }

  render() {
    const DefaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default({})
      : null;
    return (
      <div
        style={{ height: '100%', width: '100%' }}
        ref="responsiveChartContainer"
      >
        {DefaultSlot}
      </div>
    );
  }
}
