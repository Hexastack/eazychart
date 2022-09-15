import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { ChartContext } from '@ez/core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import {
  defaultPointRadius, ScaleBand, ScaleLinear, scalePointData,
} from '@ez/core/src';
import Point from '@/components/shapes/Point';
import Line from '@/components/shapes/Line';

@Component({ components: { Point, Line } })
export default class Points extends Vue {
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
    type: Number,
    default: defaultPointRadius,
  })
  private readonly r!: number;

  get scaledData() {
    if (!this.xScale || !this.yScale) {
      return [];
    }
    return scalePointData(
      this.chart.activeData,
      this.xScale,
      this.yScale,
      this.chart.dimensions,
      this.chart.isRTL,
    );
  }

  render() {
    const {
      scaledData, $scopedSlots, r, chart,
    } = this;
    const { scales, dimensions } = chart;

    if ($scopedSlots.default) {
      return (
        <g class="ez-points">
          {$scopedSlots.default({ scaledData, dimensions, scales })}
        </g>
      );
    }

    return (
      <g class="ez-points">
        {scaledData.map((pointDatum) => (
          <Point shapeDatum={pointDatum} key={pointDatum.id} r={r} />
        ))}
      </g>
    );
  }
}
