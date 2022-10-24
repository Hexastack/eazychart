import { PropType } from 'vue';
import { ScaleLinear } from 'eazychart-core/src';
import Component, { mixins } from 'vue-class-component';
import {
  AnimationOptions,
  AxisConfig,
  ChartPadding,
  Dimensions,
  Direction,
  GridConfig,
  Position,
  RawData,
  LineConfig,
  MarkerConfig,
  AxisConfigMulti,
  AreaConfig,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import Chart from '@/components/Chart';
import Axis from '@/components/scales/Axis';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Grid from '@/components/scales/grid/Grid';
import CartesianScale from '@/components/scales/CartesianScale';
import Area from '@/components/Area';
import ToggleDomainKeyMixin from '@/lib/ToggleDomainKeyMixin';
import ColorScale from '@/components/scales/ColorScale';

@Component({
  components: {
    Chart,
    Grid,
    Area,
    Axis,
    Legend,
    Tooltip,
  },
})
export default class MultiAreaChart extends mixins(ToggleDomainKeyMixin) {
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
    type: Object as PropType<AreaConfig>,
    default() {
      return {
        stroke: '#339999',
        strokeWidth: 2,
        curve: 'curveLinear',
      };
    },
  })
  private readonly area!: LineConfig;

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
        opacity: 0.5,
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
        domainKeys: ['yValue1', 'yValue2'],
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
      area,
      marker,
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
              domain: activeDomain,
              nice: yAxis.nice || 0,
            },
          }}
        >
          <Grid directions={grid.directions} color={grid.color} />
          <ColorScale definition={{ domain: yAxis.domainKeys, range: colors }}>
            {activeDomainKeys.map((yDomainKey) => (
              <Area
                xDomainKey={xAxis.domainKey}
                yDomainKey={yDomainKey}
                area={area}
                marker={marker}
              />
            ))}
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
