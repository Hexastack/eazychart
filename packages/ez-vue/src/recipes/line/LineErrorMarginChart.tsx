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
  ScaleLinearOrBand,
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
import CartesianScale from '@/components/scales/CartesianScale';

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
    type: Array as PropType<RawData>,
    required: true,
  })
  private readonly data!: RawData;

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
        left: 150,
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

  get dataMarginBounds() {
    const { data, yAxis, errorMargins } = this;
    const dataValues = data.map((datum) => datum[yAxis.domainKey] as number);
    const negativeMargins = data.map(
      (datum) => datum[errorMargins.negative] as number,
    );
    const positiveMargins = data.map(
      (datum) => datum[errorMargins.positive] as number,
    );
    return getDataMarginBounds(dataValues, negativeMargins, positiveMargins);
  }

  render() {
    const {
      xAxis,
      yAxis,
      errorMargins,
      data,
      line,
      area,
      marker,
      padding,
      animationOptions,
      grid,
      isRTL,
      $scopedSlots,
      dimensions,
    } = this;
    const [lowsestMarginValue, highestMarginValue] = this.dataMarginBounds;
    return (
      <Chart
        dimensions={dimensions}
        rawData={data}
        padding={padding}
        animationOptions={animationOptions}
        scopedSlots={$scopedSlots}
        isRTL={isRTL}
      >
        <CartesianScale
          xScaleConfig={{
            ScaleClass: ScaleLinear,
            definition: {
              direction: Direction.HORIZONTAL,
              domainKey: xAxis.domainKey,
              nice: xAxis.nice || 0,
              reverse: isRTL,
            },
          }}
          yScaleConfig={{
            ScaleClass: ScaleLinear,
            definition: {
              direction: Direction.VERTICAL,
              domainKey: yAxis.domainKey,
              nice: yAxis.nice || 0,
              minPadding: lowsestMarginValue,
              maxPadding: highestMarginValue,
            },
          }}
        >
          <Grid directions={grid.directions} color={grid.color} />
          <Points
            xDomainKey={xAxis.domainKey}
            yDomainKey={yAxis.domainKey}
            scopedSlots={{
              default: ({
                shapeData,
                scales: { yScale },
              }: {
                shapeData: PointDatum[];
                scales: { yScale: ScaleLinearOrBand };
              }) => {
                const lineAreaData = shapeData.map((d, idx) => {
                  const datum = data[idx];
                  return {
                    x: d.x,
                    y0: yScale.scale(
                      (datum[yAxis.domainKey] as number)
                        * (1 - Number(datum[errorMargins.negative])),
                    ),
                    y1: yScale.scale(
                      (datum[yAxis.domainKey] as number)
                        * (1 + Number(datum[errorMargins.positive])),
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
                      shapeData={shapeData}
                      curve={line.curve}
                      beta={line.beta}
                      stroke={line.stroke}
                      strokeWidth={line.strokeWidth}
                    />
                    {!marker.hidden
                      && shapeData.map((pointDatum) => (
                        <Point
                          key={pointDatum.id}
                          shapeDatum={pointDatum}
                          r={marker.radius}
                          fill={marker.color}
                          stroke={line.stroke}
                          strokeWidth={line.strokeWidth}
                        />
                      ))}
                  </g>
                );
              },
            }}
          />
          <Axis
            props={{
              ...xAxis,
              position: xAxis.position || Position.BOTTOM,
            }}
          />
          <Axis
            props={{
              ...yAxis,
              position:
                yAxis.position || (isRTL ? Position.RIGHT : Position.LEFT),
            }}
          />
        </CartesianScale>
      </Chart>
    );
  }
}
