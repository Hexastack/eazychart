import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { getDataMarginBounds, ScaleLinear } from 'eazychart-core/src';
import {
  RawData,
  Dimensions,
  LineConfig,
  AreaConfig,
  MarkerConfig,
  AnimationOptions,
  ChartPadding,
  GridConfig,
  Direction,
  AxisConfig,
  Position,
  PointDatum,
  AreaData,
  AreaCurve,
} from 'eazychart-core/src/types';
import Chart from '@/components/Chart';
import Axis from '@/components/scales/Axis';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Grid from '@/components/scales/grid/Grid';
import Points from '@/components/Points';
import LinePath from '@/components/shapes/LinePath';
import Point from '@/components/shapes/Point';
import Area from '@/components/shapes/Area';

@Component({
  components: {
    Chart,
    Grid,
    LinePath,
    Points,
    Point,
    Axis,
    Legend,
    Tooltip,
  },
})
export default class LineErrorMarginChart extends Vue {
  @Prop({
    type: Boolean,
    default() {
      return true;
    },
  })
  private readonly swapAxis!: boolean;

  @Prop({
    type: Array as PropType<RawData>,
    required: true,
  })
  private readonly rawData!: RawData;

  @Prop({
    type: Object as PropType<Partial<Dimensions>>,
    default() {
      return {};
    },
  })
  private readonly dimensions!: Partial<Dimensions>;

  @Prop({
    type: Object as PropType<LineConfig>,
    default() {
      return {
        color: '#339999',
        lineWidth: 2,
        curve: 'curveLinear',
      };
    },
  })
  private readonly line!: LineConfig;

  @Prop({
    type: Object as PropType<AreaConfig>,
    default() {
      return {
        fill: '#ef476f80',
      };
    },
  })
  private readonly area!: AreaConfig;

  @Prop({
    type: Object as PropType<MarkerConfig>,
    default() {
      return {
        hidden: true,
        radius: 5,
        color: '#FFF',
      };
    },
  })
  private readonly marker!: MarkerConfig;

  @Prop({
    type: Object as PropType<AnimationOptions>,
    default() {
      return {
        easing: 'easeBack',
        duration: 400,
        delay: 0,
      };
    },
  })
  private readonly animationOptions!: AnimationOptions;

  @Prop({
    type: Object as PropType<ChartPadding>,
    default() {
      return {
        left: 100,
        bottom: 100,
        right: 100,
        top: 100,
      };
    },
  })
  private readonly padding!: ChartPadding;

  @Prop({
    type: Object as PropType<GridConfig>,
    default() {
      return {
        directions: [Direction.HORIZONTAL, Direction.VERTICAL],
        color: '#a8a8a8',
      };
    },
  })
  private readonly grid!: GridConfig;

  @Prop({
    type: Object as PropType<AxisConfig<Position.BOTTOM | Position.TOP>>,
    default() {
      return {
        domainKey: 'xValue',
      };
    },
  })
  private readonly xAxis!: AxisConfig<Position.BOTTOM | Position.TOP>;

  @Prop({
    type: Object as PropType<AxisConfig<Position.LEFT | Position.RIGHT>>,
    default() {
      return {
        domainKey: 'yValue',
      };
    },
  })
  private readonly yAxis!: AxisConfig<Position.LEFT | Position.RIGHT>;

  @Prop({
    type: Object as PropType<{ negative: string; positive: string }>,
    default() {
      return {
        positive: 'positiveMargin',
        negative: 'negativeMargin',
      };
    },
  })
  private readonly errorMargins!: { negative: string; positive: string };

  @Prop({
    type: Boolean,
    default() {
      return false;
    },
  })
  private readonly isRTL!: boolean;

  @Prop({
    type: Function as PropType<
      (dimensions: Dimensions) => void
    >,
    required: false,
  })
  private readonly onResize?: (
    dimensions: Dimensions,
  ) => void;

  get horizontalAxis() {
    return this.swapAxis ? this.yAxis : this.xAxis;
  }

  get verticalAxis() {
    return this.swapAxis ? this.xAxis : this.yAxis;
  }

  private xScale!: ScaleLinear;

  private yScale!: ScaleLinear;

  created() {
    const { rawData, yAxis, errorMargins } = this;
    const dataValues = rawData.map((datum) => datum[yAxis.domainKey] as number);
    const negativeMargins = rawData.map(
      (datum) => datum[errorMargins.negative] as number,
    );
    const positiveMargins = rawData.map(
      (datum) => datum[errorMargins.positive] as number,
    );
    const [lowsestMarginValue, highestMarginValue] = getDataMarginBounds(
      dataValues,
      negativeMargins,
      positiveMargins,
    );
    this.xScale = new ScaleLinear({
      direction: Direction.HORIZONTAL,
      domainKey: this.horizontalAxis.domainKey,
      nice: this.horizontalAxis.nice || 0,
      reverse: this.isRTL,
    });

    this.yScale = new ScaleLinear({
      direction: Direction.VERTICAL,
      domainKey: this.verticalAxis.domainKey,
      nice: this.verticalAxis.nice || 0,
      minPadding: lowsestMarginValue,
      maxPadding: highestMarginValue,
    });
  }

  render() {
    const {
      xScale,
      yScale,
      horizontalAxis,
      verticalAxis,
      errorMargins,
      rawData,
      line,
      area,
      marker,
      padding,
      animationOptions,
      grid,
      isRTL,
      onResize,
      $scopedSlots,
      dimensions,
    } = this;

    return (
      <Chart
        dimensions={dimensions}
        rawData={rawData}
        scales={[xScale, yScale]}
        padding={padding}
        colors={[line.stroke]}
        animationOptions={animationOptions}
        scopedSlots={$scopedSlots}
        isRTL={isRTL}
        onResize={onResize}
      >
        <Grid
          directions={grid.directions}
          color={grid.color}
          xScale={xScale}
          yScale={yScale}
        />
        <Points
          xScale={xScale}
          yScale={yScale}
          scopedSlots={{
            default: ({ scaledData }: { scaledData: PointDatum[] }) => {
              const lineAreaData = scaledData.map((d, idx) => {
                const rawDatum = rawData[idx];
                return {
                  x: d.x,
                  y0: yScale.scale(
                    (rawDatum[verticalAxis.domainKey] as number)
                      * (1 - Number(rawDatum[errorMargins.negative])),
                  ),
                  y1: yScale.scale(
                    (rawDatum[verticalAxis.domainKey] as number)
                      * (1 + Number(rawDatum[errorMargins.positive])),
                  ),
                };
              });

              return (
                <g class="ez-line-error-margin">
                  <Area
                    shapeData={lineAreaData as AreaData}
                    curve={line.curve as AreaCurve}
                    beta={line.beta}
                    fill={area.fill}
                  />
                  <LinePath
                    shapeData={scaledData}
                    curve={line.curve}
                    beta={line.beta}
                    stroke={line.stroke}
                    strokeWidth={line.strokeWidth}
                  />
                  {!marker.hidden
                    && scaledData.map((pointDatum) => (
                      <Point
                        key={pointDatum.id}
                        shapeDatum={pointDatum}
                        r={marker.radius}
                        fill={marker.color}
                        strokeWidth={line.strokeWidth}
                      />
                    ))}
                </g>
              );
            },
          }}
        />
        <Axis
          position={horizontalAxis.position || Position.BOTTOM}
          aScale={xScale}
          title={horizontalAxis.title}
          titleAlign={horizontalAxis.titleAlign}
          tickLength={horizontalAxis.tickLength}
          tickCount={horizontalAxis.tickCount}
          tickSize={horizontalAxis.tickLength}
          tickFormat={horizontalAxis.tickFormat}
        />
        <Axis
          position={
            verticalAxis.position
            || (isRTL ? Position.RIGHT : Position.LEFT)
          }
          aScale={yScale}
          title={verticalAxis.title}
          titleAlign={verticalAxis.titleAlign}
          tickLength={verticalAxis.tickLength}
          tickCount={verticalAxis.tickCount}
          tickSize={verticalAxis.tickLength}
          tickFormat={verticalAxis.tickFormat}
        />
      </Chart>
    );
  }
}
