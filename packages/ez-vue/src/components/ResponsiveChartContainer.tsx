import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch, ProvideReactive } from 'vue-property-decorator';
import {
  ChartContext,
  Dimensions,
} from 'eazychart-core/src/types';
import {
  debounce,
  defaultChartContext,
  defaultChartDimensions,
} from 'eazychart-core/src';

@Component
export default class ResponsiveChartContainer extends Vue {
  @Prop({
    type: Object as PropType<Dimensions>,
    default() {
      return {};
    },
  })
  private readonly dimensions!: Partial<Dimensions>;

  private resizeObserver!: ResizeObserver;

  @Prop({
    type: Function as PropType<(dimensions: Dimensions) => void>,
  })
  private readonly onResize?: (dimensions: Dimensions) => void;

  private containerDimensions: Dimensions = {
    width: this.dimensions?.width || 0,
    height: this.dimensions?.height || 0,
  };

  private legendHeight = 0;

  @ProvideReactive('responsiveChart')
  private chart: ChartContext = {
    ...defaultChartContext,
    dimensions: this.chartDimensions,
  };

  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  created() {
    this.containerDimensions = {
      width: this.dimensions?.width || defaultChartDimensions.width,
      height: this.dimensions?.height || defaultChartDimensions.height,
    };
  }

  mounted() {
    // Dimensions values has not been set, we need to observe and resize
    if (!this.dimensions?.width || !this.dimensions?.height) {
      const observer = new ResizeObserver(
        debounce((entries: ResizeObserverEntry[]) => {
          this.resizeChart(entries);
        }, 100),
      );
      const chartRef = this.$refs.chart as Node;
      observer.observe(chartRef.parentNode as Element, {
        box: 'border-box',
      });
    }
  }

  @Watch('dimensions')
  onDimensionsChange() {
    // If dimensions prop is provided, we force the values
    const newDimensions = {
      width: this.dimensions?.width || this.containerDimensions.width,
      height: this.dimensions?.height || this.containerDimensions.height,
    };
    this.containerDimensions = newDimensions;
  }

  @Watch('containerDimensions')
  onContainerDimensionsChange() {
    this.chart.dimensions = this.chartDimensions;
  }

  resizeChart(entries: ResizeObserverEntry[]) {
    entries.forEach((entry) => {
      // We set the dimensions as provided in the props. Otherwise, we set the parent dimensions.
      // At last, if width / height are equal to zero we default the dimensions
      // so that the end-user would be able to see the chart.
      const newDimensions = {
        width:
          this.dimensions?.width
          || Math.floor(entry.contentRect.width)
          || defaultChartDimensions.width,
        height:
          this.dimensions?.height
          || Math.floor(entry.contentRect.height)
          || defaultChartDimensions.height,
      };
      this.containerDimensions = newDimensions;
      this.onResize && this.onResize(newDimensions);
    });
  }

  get chartDimensions(): Dimensions {
    const { containerDimensions } = this;
    // It take the container dimensions and subsctract padding and legend height
    return {
      width: containerDimensions.width,
      height: containerDimensions.height,
    };
  }

  get containerStyle() {
    return {
      width: `${this.containerDimensions.width}px`,
      height: `${this.containerDimensions.height}px`,
    };
  }

  get svgStyle() {
    return {
      width: `${this.containerDimensions.width}px`,
      height: `${this.containerDimensions.height - this.legendHeight}px`,
    };
  }

  render() {
    const { containerStyle } = this;

    const DefaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default({})
      : null;

    return (
      <div style={containerStyle} ref="responsiveChartContainer">
        {DefaultSlot}
      </div>
    );
  }
}
