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
  ShapeClickEventHandler,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';
import Chart from '@/components/Chart';
import Axis from '@/components/scales/Axis';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Bars from '@/components/Bars';
import Grid from '@/components/scales/grid/Grid';
import ToggleDatumMixin from '@/lib/ToggleDatumMixin';
import CartesianScale from '@/components/scales/CartesianScale';
import ColorScale from '@/components/scales/ColorScale';

@Component({
  components: {
    Chart,
    Grid,
    Bars,
    Axis,
    Legend,
    Tooltip,
  },
})
export default class BarChart extends mixins(ToggleDatumMixin) {
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
    type: Boolean,
    default() {
      return false;
    },
  })
  private readonly isRTL!: boolean;

  @Prop({
    type: Function as PropType<ShapeClickEventHandler>,
    default() {
      return () => {};
    },
  })
  private readonly onShapeClick!: ShapeClickEventHandler;

  getData(): RawData {
    return this.data;
  }

  getColors(): string[] {
    return this.colors;
  }

  getDomainKey(): string {
    return this.yAxis.domainKey;
  }

  render() {
    const {
      xAxis,
      yAxis,
      padding,
      animationOptions,
      grid,
      isRTL,
      $scopedSlots,
      dimensions,
      activeData,
      activeColors,
      toggleDatum,
      onShapeClick,
    } = this;

    const scopedSlots = {
      Legend: $scopedSlots.Legend
        ? $scopedSlots.Legend
        : () => <Legend props={{ onToggle: toggleDatum }} />,
      Tooltip: $scopedSlots.Tooltip,
    };

    return (
      <Chart
        dimensions={dimensions}
        rawData={activeData}
        padding={padding}
        animationOptions={animationOptions}
        isRTL={isRTL}
        onShapeClick={onShapeClick}
        scopedSlots={scopedSlots}
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
            ScaleClass: ScaleBand,
            definition: {
              direction: Direction.VERTICAL,
              domainKey: yAxis.domainKey,
            },
          }}
        >
          <Grid directions={grid.directions} color={grid.color} />
          <ColorScale
            definition={{ domainKey: yAxis.domainKey, range: activeColors }}
          >
            <Bars xDomainKey={xAxis.domainKey} yDomainKey={yAxis.domainKey} />
          </ColorScale>
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
