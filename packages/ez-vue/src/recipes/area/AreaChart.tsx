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
import 'eazychart-css/css/style.css';
import Grid from '@/components/scales/grid/Grid';
import Points from '@/components/Points';
import LinePath from '@/components/shapes/LinePath';
import Area from '@/components/shapes/Area';
import Point from '@/components/shapes/Point';

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
        color: '#339999',
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
    type: Boolean,
    default() {
      return false;
    },
  })
  private readonly isRTL!: boolean;

  @Prop({
    type: Function as PropType<(dimensions: Dimensions) => void>,
    required: false,
  })
  private readonly onResize?: (dimensions: Dimensions) => void;

  get horizontalAxis() {
    return this.swapAxis ? this.yAxis : this.xAxis;
  }

  get verticalAxis() {
    return this.swapAxis ? this.xAxis : this.yAxis;
  }

  private xScale!: ScaleLinear;

  private yScale!: ScaleLinear;

  created() {
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
    });
  }

  render() {
    const {
      xScale,
      yScale,
      horizontalAxis,
      verticalAxis,
      data,
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
        rawData={data}
        scales={[xScale, yScale]}
        padding={padding}
        colors={[area.stroke]}
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
            default: ({
              scaledData,
              dimensions: chartDimensions,
            }: {
              scaledData: PointDatum[];
              dimensions: Dimensions;
            }) => {
              const lineAreaData: AreaData = scaledData.map((d) => ({
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
                    shapeData={scaledData}
                    curve={area.curve}
                    beta={area.beta}
                    stroke={area.stroke}
                    strokeWidth={area.strokeWidth}
                  />
                  {!marker.hidden
                    && scaledData.map((pointDatum) => (
                      <Point
                        key={pointDatum.id}
                        shapeDatum={pointDatum}
                        r={marker.radius}
                        fill={marker.color}
                        strokeWidth={area.strokeWidth}
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
