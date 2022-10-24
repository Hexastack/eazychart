import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  AnimationOptions,
  AxisConfig,
  ChartPadding,
  Dimensions,
  Direction,
  GridConfig,
  Position,
  RawData,
  PointConfig,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import { ScaleLinear } from 'eazychart-core/src';
import Chart from '@/components/Chart';
import Axis from '@/components/scales/Axis';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Grid from '@/components/scales/grid/Grid';
import Points from '@/components/Points';
import CartesianScale from '@/components/scales/CartesianScale';

@Component({
  components: {
    Chart,
    Grid,
    Points,
    Axis,
    Legend,
    Tooltip,
  },
})
export default class ScatterChart extends Vue {
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
    type: Object as PropType<PointConfig>,
    default() {
      return {
        radius: 5,
        color: '#339999',
      };
    },
  })
  private readonly point!: PointConfig;

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
      padding,
      point,
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
            r={point.radius}
            fill={point.color}
            stroke={point.color}
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
