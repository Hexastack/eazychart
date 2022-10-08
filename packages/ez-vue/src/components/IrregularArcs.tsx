import Vue from 'vue';
import Component from 'vue-class-component';
import { ChartContext, Dimensions, Point } from 'eazychart-core/src/types';
import { InjectReactive, Prop, Watch } from 'vue-property-decorator';
import { ScaleLinear, ScaleOrdinal, scalePieArcData } from 'eazychart-core/src';
import Arc from '@/components/shapes/Arc';

@Component({ components: { Arc } })
export default class IrregularArcs extends Vue {
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
    return this.getRadius(this.chart.dimensions);
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

  created() {
    this.linearScale.appendDefinition({
      range: [this.getRadius(this.chart.dimensions) / 2, this.getRadius(this.chart.dimensions)],
    });
  }

  @Watch('radius')
  onRadiusChange() {
    this.linearScale.appendDefinition({ range: [this.radius / 2, this.radius] });
  }

  render() {
    const {
      shapeData,
      center,
      cornerRadius,
      padAngle,
      padRadius,
      stroke,
      strokeWidth,
    } = this;

    const minArcValue = this.linearScale.scale(
      Math.min(...shapeData.map((shapeDatum) => shapeDatum.value)),
    );

    return (
      <g
        transform={`translate(${center.x},${center.y})`}
        class="ez-irregular-arcs"
      >
        {shapeData.map((shapeDatum) => {
          const outerRadius = this.linearScale.scale(shapeDatum.value);
          const innerRadius = minArcValue * this.donutRadius;
          return (
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
          );
        })}
      </g>
    );
  }
}
