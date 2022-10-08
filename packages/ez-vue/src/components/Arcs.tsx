import Vue from 'vue';
import Component from 'vue-class-component';
import { ChartContext, Dimensions, Point } from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { scaleArcData, ScaleLinear, ScaleOrdinal } from 'eazychart-core/src';
import Arc from '@/components/shapes/Arc';

@Component({ components: { Arc } })
export default class Arcs extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @InjectReactive('colorScale')
  private colorScale!: ScaleOrdinal;

  @InjectReactive('linearScale')
  private linearScale!: ScaleLinear;

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
  private readonly spacing!: number;

  @Prop({
    type: Number,
    default: 0,
  })
  private readonly cornerRadius!: number;

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
    type: Function,
  })
  private readonly sortValues!: undefined | ((a: number, b: number) => number);

  get radius() {
    return this.getRadius(this.chart.dimensions);
  }

  get center() {
    return this.getCenter(this.chart.dimensions);
  }

  get shapeData() {
    return scaleArcData(
      this.chart.data,
      this.valueDomainKey,
      this.labelDomainKey,
      this.linearScale,
      this.colorScale,
      this.startAngle,
      this.sortValues,
    );
  }

  render() {
    const {
      shapeData,
      radius,
      center,
      cornerRadius,
      stroke,
      strokeWidth,
      spacing,
    } = this;

    return (
      <g transform={`translate(${center.x},${center.y})`} class="ez-arcs">
        {shapeData.map((shapeDatum, index) => {
          const arcWidth = radius / shapeData.length;
          const outerRadius = radius - index * arcWidth;
          const newArcWidth = arcWidth * (1 - spacing);
          const innerRadius = outerRadius - newArcWidth;
          return (
            <Arc
              key={shapeDatum.id}
              shapeDatum={shapeDatum}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
              cornerRadius={cornerRadius}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          );
        })}
      </g>
    );
  }
}
