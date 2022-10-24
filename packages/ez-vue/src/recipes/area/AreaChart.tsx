import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  AnimationOptions,
  AxisConfig,
  ChartPadding,
  Dimensions,
  Direction,
  GridConfig,
  PointDatum,
  Position,
  RawData,
  AreaConfig,
  MarkerConfig,
  AreaData,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import { ScaleLinear } from 'eazychart-core/src';
import Chart from '@/components/Chart';
import Axis from '@/components/scales/Axis';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Grid from '@/components/scales/grid/Grid';
import Points from '@/components/Points';
import LinePath from '@/components/shapes/LinePath';
import Area from '@/components/shapes/Area';
import Point from '@/components/shapes/Point';
import CartesianScale from '@/components/scales/CartesianScale';

@Component({
  components: {
    Chart,
    Grid,
    Area,
    LinePath,
    Points,
    Point,
    Axis,
    Legend,
    Tooltip,
  },
})
export default class AreaChart extends Vue {
  @Prop({
    type: Array as PropType<RawData>,
    required: true,
  })
  private readonly data!: RawData;

  @Prop({
    type: Object as PropType<Dimensions>,
    default() {
      return {};
    },
  })
  private readonly dimensions!: Partial<Dimensions>;

  @Prop({
    type: Object as PropType<AreaConfig>,
    default() {
      return {
        fill: '#339999',
        lineWidth: 2,
        curve: 'curveLinear',
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
    type: Boolean,
    default() {
      return false;
    },
  })
  private readonly isRTL!: boolean;

  render() {
    const {
      xAxis,
      yAxis,
      data,
      area,
      marker,
      padding,
      animationOptions,
      grid,
      isRTL,
      $scopedSlots,
      dimensions,
    } = this;

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
                dimensions: chartDimensions,
              }: {
                shapeData: PointDatum[];
                dimensions: Dimensions;
              }) => {
                const lineAreaData: AreaData = shapeData.map((d) => ({
                  x: d.x,
                  y0: chartDimensions.height,
                  y1: d.y,
                }));
                return (
                  <g class="ez-area">
                    <Area
                      shapeData={lineAreaData}
                      curve={area.curve}
                      beta={area.beta}
                      fill={area.fill}
                    />
                    <LinePath
                      shapeData={shapeData}
                      curve={area.curve}
                      beta={area.beta}
                      stroke={area.stroke}
                      strokeWidth={area.strokeWidth}
                    />
                    {!marker.hidden
                      && shapeData.map((pointDatum) => (
                        <Point
                          key={pointDatum.id}
                          shapeDatum={pointDatum}
                          r={marker.radius}
                          fill={marker.color}
                          stroke={area.stroke}
                          strokeWidth={area.strokeWidth}
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
