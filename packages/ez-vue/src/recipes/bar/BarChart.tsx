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
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';
import Chart from '@/components/Chart';
import Axis from '@/components/scales/Axis';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Bars from '@/components/Bars';
import Grid from '@/components/scales/grid/Grid';

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
export default class BarChart extends Vue {
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
    type: Function as PropType<
      (dimensions: Dimensions) => void
    >,
    required: false,
  })
  private readonly onResize?: (
    dimensions: Dimensions,
  ) => void;

  private xScale!: ScaleLinear;

  private yScale!: ScaleBand;

  created() {
    this.xScale = new ScaleLinear({
      direction: Direction.HORIZONTAL,
      domainKey: this.xAxis.domainKey,
      nice: this.xAxis.nice || 0,
      reverse: this.isRTL,
    });

    this.yScale = new ScaleBand({
      direction: Direction.VERTICAL,
      domainKey: this.yAxis.domainKey,
    });
  }

  render() {
    const {
      xScale,
      yScale,
      xAxis,
      yAxis,
      data,
      padding,
      colors,
      animationOptions,
      grid,
      isRTL,
      onResize,
      $scopedSlots,
      dimensions,
    } = this;

    const defaultLegend = (props: {}) => (
      <Legend ref="legend" props={props} />
    );
    const scopedSlots = {
      Legend: $scopedSlots.Legend ? $scopedSlots.Legend : defaultLegend,
      Tooltip: $scopedSlots.Tooltip,
    };

    return (
      <Chart
        dimensions={dimensions}
        rawData={data}
        scales={[xScale, yScale]}
        padding={padding}
        colors={colors}
        animationOptions={animationOptions}
        scopedSlots={scopedSlots}
        isRTL={isRTL}
        onResize={onResize}
      >
        <Grid
          directions={grid.directions}
          color={grid.color}
          xScale={xScale}
          yScale={yScale}
        />
        <Bars xScale={xScale} yScale={yScale} />
        <Axis
          aScale={xScale}
          position={xAxis.position || Position.BOTTOM}
          title={xAxis.title}
          titleAlign={xAxis.titleAlign}
          tickCount={xAxis.tickCount}
          tickSize={xAxis.tickSize}
          tickLength={xAxis.tickLength}
          tickFormat={xAxis.tickFormat}
        />
        <Axis
          aScale={yScale}
          position={
            yAxis.position || (isRTL ? Position.RIGHT : Position.LEFT)
          }
          title={yAxis.title}
          titleAlign={yAxis.titleAlign}
          tickCount={yAxis.tickCount}
          tickSize={yAxis.tickSize}
          tickLength={yAxis.tickLength}
          tickFormat={yAxis.tickFormat}
        />
      </Chart>
    );
  }
}
