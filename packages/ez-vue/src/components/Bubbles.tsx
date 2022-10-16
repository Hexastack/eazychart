import Vue from 'vue';
import Component from 'vue-class-component';
import { ChartContext, ScaleLinearOrBand } from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { ScaleLinear, scaleBubbleData } from 'eazychart-core/src';
import Bubble from './shapes/Bubble';

@Component({ components: { Bubble } })
export default class Bubbles extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @InjectReactive('cartesianScale')
  private cartesianScale!: { xScale: ScaleLinearOrBand, yScale: ScaleLinearOrBand };

  @InjectReactive('linearScale')
  private linearScale!: ScaleLinear;

  @Prop({
    type: String,
    required: true,
  })
  private readonly xDomainKey!: string;

  @Prop({
    type: String,
    required: true,
  })
  private readonly yDomainKey!: string;

  @Prop({
    type: String,
    required: true,
  })
  private readonly rDomainKey!: string;

  @Prop({
    type: String,
    default: null,
  })
  private readonly fill!: string;

  get shapeData() {
    return scaleBubbleData(
      this.chart.data,
      this.xDomainKey,
      this.yDomainKey,
      this.rDomainKey,
      this.cartesianScale.xScale,
      this.cartesianScale.yScale,
      this.linearScale,
    );
  }

  render() {
    const { shapeData, $scopedSlots, fill } = this;

    if ($scopedSlots.default) {
      return <g class="ez-bubbles" data-testid="ez-bubbles"
      >{$scopedSlots.default({ shapeData })}</g>;
    }

    return (
      <g class="ez-bubbles" data-testid="ez-bubbles">
        {shapeData.map((pointDatum) => (
          <Bubble shapeDatum={pointDatum} key={pointDatum.id} fill={fill} />
        ))}
      </g>
    );
  }
}
