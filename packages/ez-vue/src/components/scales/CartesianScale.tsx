import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  InjectReactive,
  Prop,
  ProvideReactive,
  Watch,
} from 'vue-property-decorator';
import {
  ChartContext,
  ScaleLinearOrBand,
  ScaleConfig,
} from 'eazychart-core/src/types';
import { ScaleLinear } from 'eazychart-core/src';
import Fragment from '@/lib/Fragment';

@Component
export default class CartesianScale extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @Prop({
    type: Object as PropType<ScaleConfig>,
    required: true,
  })
  private readonly xScaleConfig!: ScaleConfig;

  @Prop({
    type: Object as PropType<ScaleConfig>,
    required: true,
  })
  private readonly yScaleConfig!: ScaleConfig;

  @ProvideReactive('cartesianScale')
  private cartesianScale: {
    xScale: ScaleLinearOrBand;
    yScale: ScaleLinearOrBand;
  } = {
    xScale: new ScaleLinear(),
    yScale: new ScaleLinear(),
  };

  created() {
    this.cartesianScale.xScale = this.defineScale(this.xScaleConfig);
    this.cartesianScale.yScale = this.defineScale(this.yScaleConfig);
  }

  updated() {
    this.cartesianScale.xScale = this.defineScale(this.xScaleConfig);
    this.cartesianScale.yScale = this.defineScale(this.yScaleConfig);
  }

  @Watch('chart.dimensions')
  @Watch('chart.data')
  onChartUpdate() {
    const { dimensions, data } = this.chart;
    this.cartesianScale.xScale.computeScale(dimensions, data);
    this.cartesianScale.yScale.computeScale(dimensions, data);
  }

  defineScale(config: ScaleConfig) {
    const { ScaleClass, definition } = config;
    const { dimensions, data } = this.chart;
    const scale = new ScaleClass(definition);
    scale.computeScale(dimensions, data);
    return scale;
  }

  render() {
    const DefaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default({})
      : null;
    return (
      <Fragment type="g" name="cartesian-scale">
        {DefaultSlot}
      </Fragment>
    );
  }
}
