import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { ChartContext } from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import {
  defaultPointRadius, ScaleBand, ScaleLinear, scalePointData,
} from 'eazychart-core/src';
import Point from '@/components/shapes/Point';
import LinePath from '@/components/shapes/LinePath';

@Component({ components: { Point, LinePath } })
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
    type: Object as PropType<ScaleBand>,
  })
  private readonly xColumnScale!: ScaleBand;

  @Prop({
    type: Number,
    default: defaultPointRadius,
  })
  private readonly r!: number;

  get scaledData() {
    const xColumnScaleWidth = this.xColumnScale?.scale?.bandwidth() || 0;
    const xScaledPointDiff = xColumnScaleWidth / 2;

    if (!this.xScale || !this.yScale) {
      return [];
    }
    return scalePointData(
      this.chart.activeData,
      this.xScale,
      this.yScale,
      this.chart.dimensions,
      this.chart.isRTL,
      xScaledPointDiff,
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
