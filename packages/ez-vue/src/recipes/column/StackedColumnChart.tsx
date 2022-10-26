import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import {
  AnimationOptions,
  ChartPadding,
  Direction,
  Position,
  RawData,
  GridConfig,
  AxisConfig,
  Dimensions,
  AxisConfigMulti,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';
import Chart from '@/components/Chart';
import Axis from '@/components/scales/Axis';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import StackedBars from '@/components/StackedBars';
import Grid from '@/components/scales/grid/Grid';
import ColorScale from '@/components/scales/ColorScale';
import CartesianScale from '@/components/scales/CartesianScale';
import ToggleDomainKeyMixin from '@/lib/ToggleDomainKeyMixin';

@Component({
  components: {
    Chart,
    Grid,
    StackedBars,
    Axis,
    Legend,
    Tooltip,
  },
})
export default class StackedColumnChart extends mixins(ToggleDomainKeyMixin) {
  @Prop({
    type: Array as PropType<RawData>,
    required: true,
  })
  private readonly data!: RawData;

  @Prop({
    type: Array,
    default() {
      return ['#339999', '#993399', '#333399'];
    },
  })
  private readonly colors!: string[];

  @Prop({
    type: Object as PropType<Dimensions>,
    default() {
      return {};
    },
  })
  private readonly dimensions!: Partial<Dimensions>;

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
        domainKey: 'name',
      };
    },
  })
  private readonly xAxis!: AxisConfig<Position.BOTTOM | Position.TOP>;

  @Prop({
    type: Object as PropType<AxisConfigMulti<Position.LEFT | Position.RIGHT>>,
    default() {
      return {
        domainKeys: ['value', 'value1', 'value2'],
      };
    },
  })
  private readonly yAxis!: AxisConfigMulti<Position.LEFT | Position.RIGHT>;

  @Prop({
    type: Boolean,
    default() {
      return false;
    },
  })
  private readonly isRTL!: boolean;

  getData(): RawData {
    return this.data;
  }

  getDomainKeys(): string[] {
    return this.yAxis.domainKeys;
  }

  render() {
    const {
      xAxis,
      yAxis,
      data,
      colors,
      padding,
      animationOptions,
      grid,
      isRTL,
      $scopedSlots,
      dimensions,
      activeDomain,
      activeDomainKeys,
      toggleDomainKey,
    } = this;

    const scopedSlots = {
      Legend: $scopedSlots.Legend
        ? $scopedSlots.Legend
        : () => <Legend props={{ onToggle: toggleDomainKey }} />,
      Tooltip: $scopedSlots.Tooltip,
    };
    return (
      <Chart
        dimensions={dimensions}
        rawData={data}
        padding={padding}
        animationOptions={animationOptions}
        scopedSlots={scopedSlots}
        isRTL={isRTL}
      >
        <CartesianScale
          xScaleConfig={{
            ScaleClass: ScaleBand,
            definition: {
              direction: Direction.HORIZONTAL,
              domainKey: xAxis.domainKey,
            },
          }}
          yScaleConfig={{
            ScaleClass: ScaleLinear,
            definition: {
              direction: Direction.VERTICAL,
              domain: activeDomain,
              nice: yAxis.nice || 0,
            },
          }}
        >
          <Grid directions={grid.directions} color={grid.color} />
          <ColorScale definition={{ domain: yAxis.domainKeys, range: colors }}>
            <StackedBars
              singleDomainKey={xAxis.domainKey}
              stackDomainKeys={activeDomainKeys}
              direction={Direction.VERTICAL}
            />
          </ColorScale>
          <Axis
            position={xAxis.position || Position.BOTTOM}
            title={xAxis.title}
            titleAlign={xAxis.titleAlign}
            tickLength={xAxis.tickLength}
            tickCount={xAxis.tickCount}
            tickSize={xAxis.tickLength}
            tickFormat={xAxis.tickFormat}
          />
          <Axis
            position={
              yAxis.position || (isRTL ? Position.RIGHT : Position.LEFT)
            }
            title={yAxis.title}
            titleAlign={yAxis.titleAlign}
            tickLength={yAxis.tickLength}
            tickCount={yAxis.tickCount}
            tickSize={yAxis.tickLength}
            tickFormat={yAxis.tickFormat}
          />
        </CartesianScale>
      </Chart>
    );
  }
}
