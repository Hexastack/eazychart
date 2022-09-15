import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { ChartContext } from '@ez/core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { ScaleBand, ScaleLinear, scaleBubbleData } from '@ez/core/src';
import Bubble from './shapes/Bubble';

@Component({ components: { Bubble } })
export default class Bubbles extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @Prop({
    type: Object as PropType<ScaleLinear | ScaleBand>,
    required: true,
  })
  private readonly xScale!: ScaleLinear | ScaleBand;

  @Prop({
    type: Object as PropType<ScaleLinear | ScaleBand>,
    required: true,
  })
  private readonly yScale!: ScaleLinear | ScaleBand;

  @Prop({
    type: Object as PropType<ScaleLinear>,
    required: true,
  })
  private readonly rScale!: ScaleLinear;

  @Prop({
    type: String,
    default: null,
  })
  private readonly fill!: string;

  get scaledData() {
    if (!this.xScale || !this.yScale || !this.rScale) {
      return [];
    }

    return scaleBubbleData(
      this.chart.activeData,
      this.xScale,
      this.yScale,
      this.rScale,
      this.chart.dimensions,
      this.chart.isRTL,
    );
  }

  render() {
    const { scaledData, $scopedSlots, fill } = this;

    if ($scopedSlots.default) {
      return <g class="ez-bubbles">{$scopedSlots.default({ scaledData })}</g>;
    }

    return (
      <g class="ez-bubbles">
        {scaledData.map((pointDatum) => (
          <Bubble shapeDatum={pointDatum} key={pointDatum.id} fill={fill} />
        ))}
      </g>
    );
  }
}
