import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { ChartContext, Dimensions, Point } from '@ez/core/src/types';
import { InjectReactive, Prop, Watch } from 'vue-property-decorator';
import { ScaleLinear, scalePieArcData } from '@ez/core/src';
import Arc from '@/components/shapes/Arc';

@Component({ components: { Arc } })
export default class IrregularArcs extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @Prop({
    type: Object as PropType<ScaleLinear>,
    required: true,
  })
  private readonly aScale!: ScaleLinear;

  @Prop({
    type: Object as PropType<ScaleLinear>,
    required: true,
  })
  private readonly rScale!: ScaleLinear;

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
      this.chart.activeData,
      this.aScale,
      this.startAngle,
      this.endAngle,
      this.sortValues,
    );
  }

  created() {
    this.rScale.appendDefinition({
      range: [this.getRadius(this.chart.dimensions) / 2, this.getRadius(this.chart.dimensions)],
    });
  }

  @Watch('radius')
  onRadiusChange() {
    this.rScale.appendDefinition({ range: [this.radius / 2, this.radius] });
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

    const minArcValue = this.rScale.scale(
      Math.min(...shapeData.map((shapeDatum) => shapeDatum.value)),
    );

    return (
      <g
        transform={`translate(${center.x},${center.y})`}
        class="ez-irregular-arcs"
      >
        {shapeData.map((shapeDatum) => {
          const outerRadius = this.rScale.scale(shapeDatum.value);
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
