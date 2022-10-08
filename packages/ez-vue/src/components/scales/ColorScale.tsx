import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  InjectReactive,
  Prop,
  ProvideReactive,
  Watch,
} from 'vue-property-decorator';
import { ChartContext, ScaleOrdinalDefinition } from 'eazychart-core/src/types';
import { ScaleOrdinal } from 'eazychart-core/src';
import Fragment from '@/lib/Fragment';

@Component
export default class ColorScale extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @ProvideReactive('colorScale')
  private colorScale = new ScaleOrdinal();

  @Prop({
    type: Object as PropType<ScaleOrdinalDefinition>,
    required: true,
  })
  private readonly definition!: ScaleOrdinalDefinition;

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
    const { definition } = this;
    const { dimensions, data } = this.chart;
    const scale = new ScaleOrdinal(definition);
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
