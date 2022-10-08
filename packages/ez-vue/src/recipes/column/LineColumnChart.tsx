import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  AnimationOptions,
  ChartPadding,
  Direction,
  Position,
  RawData,
  GridConfig,
  AxisConfig,
  Dimensions,
  PointDatum,
  LineConfig,
  MarkerConfig,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';
import Chart from '@/components/Chart';
import Axis from '@/components/scales/Axis';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Bars from '@/components/Bars';
import Grid from '@/components/scales/grid/Grid';
import Points from '@/components/Points';
import LinePath from '@/components/shapes/LinePath';
import Point from '@/components/shapes/Point';

@Component({
  components: {
    Chart,
    Grid,
    Bars,
    Points,
    Point,
    LinePath,
    Axis,
    Legend,
    Tooltip,
  },
})
export default class LineColumnChart extends Vue {
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
    type: Object as PropType<LineConfig>,
    default() {
      return {
        stroke: '#339999',
        strokeWidth: 2,
        curve: 'curveLinear',
      };
    },
  })
  private readonly line!: LineConfig;

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
    type: Array,
    default() {
      return ['#339999', '#993399', '#333399'];
    },
  })
  private readonly colors!: string[];

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
        right: 150,
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
        position: Position.BOTTOM,
      };
    },
  })
  private readonly xAxis!: AxisConfig<Position.BOTTOM | Position.TOP>;

  @Prop({
    type: Object as PropType<AxisConfig<Position.LEFT | Position.RIGHT>>,
    default() {
      return {
        domainKey: 'yValue',
        position: Position.LEFT,
      };
    },
  })
  private readonly yAxis!: AxisConfig<Position.LEFT | Position.RIGHT>;

  @Prop({
    type: Object as PropType<AxisConfig<Position.LEFT | Position.RIGHT>>,
    default() {
      return {
        domainKey: 'yValue',
        position: Position.RIGHT,
      };
    },
  })
  private readonly yLineAxis!: AxisConfig<Position.LEFT | Position.RIGHT>;

  @Prop({
    type: Boolean,
    default() {
      return false;
    },
  })
  private readonly isRTL!: boolean;

  private xColumnScale!: ScaleBand;

  private yColumnScale!: ScaleLinear;

  private xLineScale!: ScaleBand;

  private yLineScale!: ScaleLinear;

  created() {
    this.xColumnScale = new ScaleBand({
      direction: Direction.HORIZONTAL,
      domainKey: this.xAxis.domainKey,
    });

    this.yColumnScale = new ScaleLinear({
      direction: Direction.VERTICAL,
      domainKey: this.yAxis.domainKey,
      nice: this.yAxis.nice || 0,
    });

    this.xLineScale = new ScaleBand({
      direction: Direction.HORIZONTAL,
      domainKey: this.xAxis.domainKey,
      innerPadding: 0.5,
      outerPadding: 0.1,
      align: 1,
    });

    this.yLineScale = new ScaleLinear({
      direction: Direction.VERTICAL,
      domainKey: this.yLineAxis.domainKey,
      nice: this.yLineAxis.nice || 0,
    });
  }

  render() {
    const {
      xColumnScale,
      yColumnScale,
      xLineScale,
      yLineScale,
      xAxis,
      yAxis,
      yLineAxis,
      data,
      line,
      marker,
      padding,
      colors,
      animationOptions,
      grid,
      isRTL,
      $scopedSlots,
      dimensions,
    } = this;

    const scopedSlots = {
      Legend: $scopedSlots.Legend ? $scopedSlots.Legend : () => <Legend />,
      Tooltip: $scopedSlots.Tooltip,
    };

    return (
      <Chart
        dimensions={dimensions}
        rawData={data}
        scales={[xColumnScale, yColumnScale, xLineScale, yLineScale]}
        padding={padding}
        colors={colors}
        animationOptions={animationOptions}
        scopedSlots={scopedSlots}
        isRTL={isRTL}
      >
        <Grid
          directions={grid.directions}
          color={grid.color}
          xScale={xColumnScale}
          yScale={yColumnScale}
        />
        <Bars xScale={xColumnScale} yScale={yColumnScale} />
        <Points
          xScale={xLineScale}
          yScale={yLineScale}
          scopedSlots={{
            default: ({ scaledData }: { scaledData: PointDatum[] }) => (
              <g class="ez-line">
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
                      stroke={marker.color}
                      fill={marker.color}
                      strokeWidth={line.strokeWidth}
                    />
                  ))}
              </g>
            ),
          }}
        />
        <Axis
          props={{
            ...xAxis,
            aScale: xColumnScale,
            position: xAxis.position || Position.BOTTOM,
          }}
        />
        <Axis
          props={{
            ...yAxis,
            aScale: yColumnScale,
            position:
              yAxis.position || (isRTL ? Position.RIGHT : Position.LEFT),
          }}
        />
        <Axis
          props={{
            ...yLineAxis,
            aScale: yLineScale,
            position:
              yLineAxis.position || (isRTL ? Position.LEFT : Position.RIGHT),
          }}
        />
      </Chart>
    );
  }
}
