import Vue from 'vue';
import Component from 'vue-class-component';
import { ChartContext, Dimensions, Point } from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { ScaleOrdinal, scalePieArcData } from 'eazychart-core/src';
import Arc from '@/components/shapes/Arc';

@Component({ components: { Arc } })
export default class Pie extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @InjectReactive('colorScale')
  private colorScale!: ScaleOrdinal;

  @Prop({
    type: String,
    default: 0,
  })
  private readonly valueDomainKey!: string;

  @Prop({
    type: String,
    default: 0,
  })
  private readonly labelDomainKey!: string;

  @Prop({
    type: Number,
    default: 0,
  })
  private readonly donutRadius!: number;

  @Prop({
    type: Number,
    default: 0,
  })
  private readonly cornerRadius!: number;

  @Prop({
    type: Number,
    default: 0,
  })
  private readonly padAngle!: number;

  @Prop({
    type: Number,
    default: 0,
  })
  private readonly padRadius!: number;

  @Prop({
    type: String,
  })
  private readonly stroke!: string;

  @Prop({
    type: Number,
  })
  private readonly strokeWidth!: number;

  @Prop({
    type: Function,
    default: ({ width, height }: Dimensions) => ({
      x: width / 2,
      y: height / 2,
    }),
  })
  private readonly getCenter!: (dimensions: Dimensions) => Point;

  @Prop({
    type: Function,
    default: ({ width, height }: Dimensions) => Math.min(width, height) / 2,
  })
  private readonly getRadius!: (dimensions: Dimensions) => number;

  @Prop({
    type: Number,
    default: 0,
  })
  private readonly startAngle!: number;

  @Prop({
    type: Number,
    default: 2 * Math.PI,
  })
  private readonly endAngle!: number;

  @Prop({
    type: Function,
  })
  private readonly sortValues!: undefined | ((a: number, b: number) => number);

  get radius() {
    const radius = this.getRadius(this.chart.dimensions);
    return {
      outerRadius: radius,
      innerRadius: radius * this.donutRadius,
    };
  }

  get center() {
    return this.getCenter(this.chart.dimensions);
  }

  get shapeData() {
    return scalePieArcData(
      this.chart.data,
      this.valueDomainKey,
      this.labelDomainKey,
      this.colorScale,
      this.startAngle,
      this.endAngle,
      this.sortValues,
    );
  }

  render() {
    const {
      shapeData,
      radius,
      center,
      cornerRadius,
      padAngle,
      padRadius,
      stroke,
      strokeWidth,
    } = this;
    const { outerRadius, innerRadius } = radius;

    return (
      <g transform={`translate(${center.x},${center.y})`} class="ez-pie">
        {shapeData.map((shapeDatum) => (
          <Arc
            key={shapeDatum.id}
            shapeDatum={shapeDatum}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            cornerRadius={cornerRadius}
            padAngle={padAngle}
            padRadius={padRadius}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        ))}
      </g>
    );
  }
}
