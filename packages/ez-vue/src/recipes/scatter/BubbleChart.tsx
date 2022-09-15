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
  BubbleConfig,
} from '@ez/core/src/types';
import { Prop } from 'vue-property-decorator';
import { ScaleLinear } from '@ez/core/src';
import Chart from '@/components/Chart';
import Axis from '@/components/scales/Axis';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Grid from '@/components/scales/grid/Grid';
import Bubbles from '@/components/Bubbles';
import '@ez/css/css/style.css';

@Component({
  components: {
    Chart,
    Grid,
    Bubbles,
    Axis,
    Legend,
    Tooltip,
  },
})
export default class BubbleChart extends Vue {
  @Prop({
    type: Boolean,
    default() {
      return false;
    },
  })
  private readonly swapAxis!: boolean;

  @Prop({
    type: Array as PropType<RawData>,
    required: true,
  })
  private readonly rawData!: RawData;

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
    type: Object as PropType<BubbleConfig>,
    default() {
      return {
        domainKey: 'yValue',
        minRadius: 1,
        maxRadius: 10,
        fill: '#339999a0',
      };
    },
  })
  private readonly bubble!: BubbleConfig;

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

  private rScale!: ScaleLinear;

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

    this.rScale = new ScaleLinear({
      domainKey: this.bubble.domainKey,
      range: [this.bubble.minRadius, this.bubble.maxRadius],
    });
  }

  render() {
    const {
      xScale,
      yScale,
      rScale,
      horizontalAxis,
      verticalAxis,
      rawData,
      bubble,
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
        scales={[xScale, yScale, rScale]}
        padding={padding}
        colors={[bubble.fill]}
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
        <Bubbles
          xScale={xScale}
          yScale={yScale}
          rScale={rScale}
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
