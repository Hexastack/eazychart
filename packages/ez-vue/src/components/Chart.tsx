import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  Prop,
  Watch,
  ProvideReactive,
  InjectReactive,
} from 'vue-property-decorator';
import {
  AnimationOptions,
  ChartContext,
  ChartPadding,
  Dimensions,
  RawData,
  NormalizedDatum,
} from 'eazychart-core/src/types';
import {
  defaultChartAnimationOptions,
  defaultChartContext,
  defaultChartDimensions,
  defaultChartPadding,
  normalizeData,
  AbstractScale,
} from 'eazychart-core/src';
import TooltipProvider from '@/components/addons/tooltip/TooltipProvider';
import LegendProvider from '@/components/addons/legend/LegendProvider';

@Component
export default class Chart extends Vue {
  @InjectReactive('responsiveChart')
  private responsiveChart!: { dimensions: Dimensions };

  @Prop({
    type: Object as PropType<Dimensions>,
    default() {
      return {};
    },
  })
  private readonly dimensions!: Partial<Dimensions>;

  @Prop({
    type: Object as PropType<Partial<ChartPadding>>,
    default() {
      return {};
    },
  })
  private readonly padding!: Partial<ChartPadding>;

  @Prop({
    type: Object as PropType<Partial<AnimationOptions>>,
    default() {
      return {};
    },
  })
  private readonly animationOptions!: Partial<AnimationOptions>;

  @Prop({
    type: Array as PropType<AbstractScale[]>,
    default() {
      return [];
    },
  })
  private readonly scales!: AbstractScale[];

  @Prop({
    type: Array as PropType<RawData>,
    default() {
      return [];
    },
  })
  private readonly rawData!: RawData;

  @Prop({
    type: Array,
    default() {
      return [];
    },
  })
  private readonly colors!: string[];

  @Prop({
    type: Boolean,
    default() {
      return false;
    },
  })
  private readonly isRTL!: boolean;

  private containerDimensions: Dimensions = {
    width: 0,
    height: 0,
  };

  private legendHeight = 0;

  @ProvideReactive('chart')
  private chart: ChartContext = {
    ...defaultChartContext,
    dimensions: this.chartDimensions,
    padding: this.chartPadding,
    animationOptions: this.chartAnimationOptions,
    toggleDatum: this.toggleDatum,
    isRTL: this.isRTL,
    scales: this.scales || [],
  };

  created() {
    this.chart.dataDict = normalizeData(this.rawData, this.colors);
    const parentDimensions = this.responsiveChart.dimensions;
    this.containerDimensions = {
      width: this.dimensions?.width || parentDimensions.width || defaultChartDimensions.width,
      height: this.dimensions?.height || parentDimensions.height || defaultChartDimensions.height,
    };
  }

  mounted() {
    // Set legend height on mount and after data is populated
    this.$nextTick(() => {
      const legendRef = this.getLegendRef();
      this.legendHeight = legendRef?.clientHeight || 0;
    });
  }

  @Watch('rawData')
  onDataChange(newData: RawData) {
    this.chart.dataDict = normalizeData(newData, this.colors, false);
  }

  @Watch('colors')
  onColorsChange() {
    this.chart.dataDict = normalizeData(this.rawData, this.colors, true);
    this.chart.colors = this.colors;
  }

  @Watch('dimensions')
  @Watch('responsiveChart.dimensions')
  onDimensionsChange() {
    // If dimensions prop is provided, we force the values
    const parentDimensions = this.responsiveChart.dimensions;
    this.containerDimensions = {
      width: this.dimensions?.width || parentDimensions.width,
      height: this.dimensions?.height || parentDimensions.height,
    };
  }

  @Watch('containerDimensions')
  onContainerDimensionsChange() {
    this.chart.dimensions = this.chartDimensions;
    this.computeScales();
  }

  @Watch('animationOptions')
  onAnimationOptionsChange() {
    this.chart.animationOptions = this.chartAnimationOptions;
  }

  @Watch('chart.dataDict', { deep: true })
  onDataDictChange() {
    const data = Object.values(this.chart.dataDict);
    this.chart.data = this.isRTL ? data.reverse() : data;
    this.chart.activeData = this.chart.data.filter(({ isActive }) => isActive);
    this.computeScales();
  }

  @Watch('isRTL')
  onIsRTLChange() {
    this.chart.isRTL = this.isRTL;
    this.onDataDictChange();
  }

  toggleDatum(datum: NormalizedDatum, newState: boolean) {
    this.$set(this.chart.dataDict, datum.id, {
      ...datum,
      isActive: newState,
    });
  }

  getLegendRef() {
    if (this.$scopedSlots.Legend) {
      try {
        const legendProviderRef = this.$refs.legendProvider as Vue;
        const legendFragmentRef = legendProviderRef.$refs.legendFragment as Vue;
        const slots = legendFragmentRef.$slots.default;
        if (slots) {
          const legendSlot = slots[slots.length - 1];
          return legendSlot.elm as Element;
        }
        return undefined;
      } catch (err) {
        return undefined;
      }
    }
    // Chart does not contain/require a legend
    return undefined;
  }

  computeScales() {
    this.scales.forEach((scale) => {
      scale.computeScale(this.chartDimensions, this.chart.activeData);
    });
  }

  get chartData() {
    return Object.values(this.chart.dataDict);
  }

  get activeData() {
    return this.chartData.filter(({ isActive }) => isActive);
  }

  get chartDimensions(): Dimensions {
    const { containerDimensions, chartPadding } = this;
    const {
      top, right, bottom, left,
    } = chartPadding;
    // It takes the container dimensions and subtracts padding and legend height
    const width = containerDimensions.width - left - right;
    const height = containerDimensions.height - top - bottom;
    return {
      width: Math.max(width, 0),
      height: Math.max(height, 0),
    };
  }

  get chartPadding(): ChartPadding {
    const { padding } = this;
    return {
      ...defaultChartPadding,
      ...padding,
    };
  }

  get chartAnimationOptions(): AnimationOptions {
    const { animationOptions } = this;
    return {
      ...defaultChartAnimationOptions,
      ...animationOptions,
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

  get computedTransform() {
    return `translate(${this.chartPadding.left}, ${this.chartPadding.top})`;
  }

  render() {
    const { svgStyle, containerStyle, computedTransform } = this;

    const DefaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default({})
      : null;

    return (
      <div class="ez-viz" style={containerStyle} ref="chart">
        <TooltipProvider scopedSlots={{ Tooltip: this.$scopedSlots.Tooltip }}>
          <LegendProvider
            scopedSlots={{ Legend: this.$scopedSlots.Legend }}
            ref="legendProvider"
          >
            <div class="ez-chart">
              <svg class="ez-svg" style={svgStyle}>
                <g transform={computedTransform}>{DefaultSlot}</g>
              </svg>
            </div>
          </LegendProvider>
        </TooltipProvider>
      </div>
    );
  }
}
