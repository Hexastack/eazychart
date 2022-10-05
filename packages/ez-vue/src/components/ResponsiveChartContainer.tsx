import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { Prop, ProvideReactive } from 'vue-property-decorator';
import { Dimensions } from 'eazychart-core/src/types';
import { debounce, defaultChartDimensions } from 'eazychart-core/src';

@Component
export default class ResponsiveChartContainer extends Vue {
  @Prop({
    type: Function as PropType<(dimensions: Dimensions) => void>,
  })
  private readonly onResize?: (dimensions: Dimensions) => void;

  private resizeObserver!: ResizeObserver;

  @ProvideReactive('responsiveChart')
  private responsiveChart: { dimensions: Dimensions } = {
    dimensions: {
      width: 0,
      height: 0,
    },
  };

  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  mounted() {
    // Dimensions values has not been set, we need to observe and resize
    this.resizeObserver = new ResizeObserver(
      debounce((entries: ResizeObserverEntry[]) => {
        this.resizeChart(entries);
      }, 100),
    );
    const chartRef = this.$refs.responsiveContainer as Node;
    this.resizeObserver.observe(chartRef as Element, {
      box: 'border-box',
    });
  }

  resizeChart(entries: ResizeObserverEntry[]) {
    entries.forEach((entry) => {
      // We set the dimensions as provided in the props. Otherwise, we set the parent dimensions.
      // At last, if width / height are equal to zero we default the dimensions
      // so that the end-user would be able to see the chart.
      const newDimensions = {
        width:
          Math.floor(entry.contentRect.width) || defaultChartDimensions.width,
        height:
          Math.floor(entry.contentRect.height) || defaultChartDimensions.height,
      };
      this.responsiveChart.dimensions = newDimensions;
      this.onResize && this.onResize(newDimensions);
    });
  }

  render() {
    const DefaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default({})
      : null;

    return (
      <div
        class="ez-responsive-container"
        style={{ width: '100%', height: '100%' }}
        ref="responsiveContainer"
      >
        {DefaultSlot}
      </div>
    );
  }
}
