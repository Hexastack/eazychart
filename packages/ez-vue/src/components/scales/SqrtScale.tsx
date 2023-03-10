import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  InjectReactive,
  Prop,
  ProvideReactive,
  Watch,
} from 'vue-property-decorator';
import { ChartContext, ScaleSqrtDefinition } from 'eazychart-core/src/types';
import { ScaleSqrt } from 'eazychart-core/src';
import Fragment from '@/lib/Fragment';

@Component
export default class SqrtScale extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @ProvideReactive('sqrtScale')
  private sqrtScale = new ScaleSqrt();

  @Prop({
    type: Object as PropType<ScaleSqrtDefinition>,
    required: true,
  })
  private readonly definition!: ScaleSqrtDefinition;

  mounted() {
    this.defineScale();
  }

  @Watch('chart.dimensions')
  @Watch('chart.data')
  recomputeScale() {
    const { dimensions, data } = this.chart;
    this.sqrtScale.computeScale(dimensions, data);
  }

  @Watch('chart.definition')
  defineScale() {
    const { definition } = this;
    const { dimensions, data } = this.chart;
    this.sqrtScale = new ScaleSqrt(definition);
    this.sqrtScale.computeScale(dimensions, data);
  }

  render() {
    const DefaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default({})
      : null;
    return (
      <Fragment type="g" name="sqrt-scale">
        {DefaultSlot}
      </Fragment>
    );
  }
}
