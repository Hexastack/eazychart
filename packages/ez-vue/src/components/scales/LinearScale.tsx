import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  InjectReactive,
  Prop,
  ProvideReactive,
  Watch,
} from 'vue-property-decorator';
import { ChartContext, ScaleLinearDefinition } from 'eazychart-core/src/types';
import { ScaleLinear } from 'eazychart-core/src';
import Fragment from '@/lib/Fragment';

@Component
export default class LinearScale extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @ProvideReactive('linearScale')
  private linearScale = new ScaleLinear();

  @Prop({
    type: Object as PropType<ScaleLinearDefinition>,
    required: true,
  })
  private readonly definition!: ScaleLinearDefinition;

  mounted() {
    this.defineScale();
  }

  @Watch('chart.dimensions')
  @Watch('chart.data')
  recomputeScale() {
    const { dimensions, data } = this.chart;
    this.linearScale.computeScale(dimensions, data);
  }

  @Watch('chart.definition')
  defineScale() {
    const { definition } = this;
    const { dimensions, data } = this.chart;
    this.linearScale = new ScaleLinear(definition);
    this.linearScale.computeScale(dimensions, data);
  }

  render() {
    const DefaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default({})
      : null;
    return (
      <Fragment type="g" name="linear-scale">
        {DefaultSlot}
      </Fragment>
    );
  }
}
