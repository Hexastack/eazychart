import Vue from 'vue';
import Component from 'vue-class-component';
import { ChartContext, ScaleLinearOrBand } from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import {
  defaultColor,
  defaultPointRadius,
  scalePointData,
} from 'eazychart-core/src';
import Point from '@/components/shapes/Point';

@Component({ components: { Point } })
export default class Points extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @InjectReactive('cartesianScale')
  private cartesianScale!: {
    xScale: ScaleLinearOrBand;
    yScale: ScaleLinearOrBand;
  };

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
    type: Number,
    default: defaultPointRadius,
  })
  private readonly r!: number;

  @Prop({
    type: String,
    default: defaultColor,
  })
  private readonly fill!: string;

  @Prop({
    type: String,
    default: defaultColor,
  })
  private readonly stroke!: string;

  get shapeData() {
    return scalePointData(
      this.chart.data,
      this.xDomainKey,
      this.yDomainKey,
      this.cartesianScale.xScale,
      this.cartesianScale.yScale,
    );
  }

  render() {
    const {
      shapeData,
      $scopedSlots,
      r,
      fill,
      stroke,
      chart,
      cartesianScale: scales,
    } = this;
    const { dimensions } = chart;

    if ($scopedSlots.default) {
      return (
        <g class="ez-points">
          {$scopedSlots.default({ shapeData, scales, dimensions })}
        </g>
      );
    }

    return (
      <g class="ez-points">
        {shapeData.map((pointDatum) => (
          <Point
            shapeDatum={pointDatum}
            key={pointDatum.id}
            r={r}
            fill={fill}
            stroke={stroke}
          />
        ))}
      </g>
    );
  }
}
