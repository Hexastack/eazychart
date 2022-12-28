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
  ScaleOrdinalDefinition,
  ScaleQuantileDefinition,
} from 'eazychart-core/src/types';
import { ScaleOrdinal, ScaleQuantile } from 'eazychart-core/src';
import Fragment from '@/lib/Fragment';

@Component
export default class ColorScale extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @ProvideReactive('colorScale')
  private colorScale: ScaleOrdinal | ScaleQuantile = new ScaleOrdinal();

  @Prop({
    type: Object as PropType<ScaleOrdinalDefinition | ScaleQuantileDefinition>,
    required: true,
  })
  private readonly definition!:
    | ScaleOrdinalDefinition
    | ScaleQuantileDefinition;

  @Prop({
    type: String as PropType<'quantile' | 'ordinal'>,
    required: false,
    default: () => 'ordinal',
  })
  private readonly type!: 'quantile' | 'ordinal';

  mounted() {
    this.colorScale = this.defineScale();
    this.chart.registerScale('colorScale', this.colorScale);
  }

  updated() {
    this.colorScale = this.defineScale();
  }

  @Watch('chart.dimensions')
  @Watch('chart.data')
  recomputeScale() {
    const { dimensions, data } = this.chart;
    this.colorScale.computeScale(dimensions, data);
  }

  defineScale() {
    const { definition, type } = this;
    const { dimensions, data } = this.chart;
    let scale: ScaleOrdinal | ScaleQuantile;

    if (type === 'quantile') {
      scale = new ScaleQuantile(definition as ScaleQuantileDefinition);
    } else {
      scale = new ScaleOrdinal(definition as ScaleOrdinalDefinition);
    }
    scale.computeScale(dimensions, data);
    return scale;
  }

  render() {
    const DefaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default({})
      : null;
    return (
      <Fragment type="g" name="color-scale">
        {DefaultSlot}
      </Fragment>
    );
  }
}
