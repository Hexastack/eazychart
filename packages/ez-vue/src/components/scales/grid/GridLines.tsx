import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { InjectReactive, Prop, Watch } from 'vue-property-decorator';
import {
  defaultAxis,
  getAxisTickByCoordinate,
  getGridLines,
  transformTranslate,
  animate,
} from 'eazychart-core/src';
import {
  ChartContext, Direction, AxisData, AxisTick, ScaleLinearOrBand,
} from 'eazychart-core/src/types';

@Component
export default class GridLines extends Vue {
  @InjectReactive('cartesianScale')
  private cartesianScale!: {
    xScale: ScaleLinearOrBand;
    yScale: ScaleLinearOrBand;
  };

  @InjectReactive('chart')
  private chart!: ChartContext;

  @Prop({
    type: String as PropType<Direction>,
    default() {
      return Direction.HORIZONTAL;
    },
  })
  private readonly direction!: Direction;

  @Prop({
    type: Number,
    default: 1,
  })
  private readonly tickLength!: number;

  @Prop({
    type: Number,
    default: 10,
  })
  private readonly tickCount!: number;

  @Prop({
    type: String,
    default: '#a8a8a8',
  })
  private readonly color!: string;

  private currentGrid: AxisData = defaultAxis;

  private cancelAnimation: Function | null = null;

  created() {
    this.updateCurrentGrid();
  }

  @Watch('axisScale', { deep: true })
  onScalesChange() {
    this.updateCurrentGrid();
  }

  @Watch('direction')
  onPositionChange() {
    this.updateCurrentGrid();
  }

  updateCurrentGrid() {
    const { dimensions, animationOptions } = this.chart;
    this.cancelAnimation && this.cancelAnimation();
    const targetGrid = getGridLines(
      this.direction,
      this.axisScale.scale,
      dimensions,
      this.tickCount,
    );
    this.cancelAnimation = animate(
      this.currentGrid,
      targetGrid,
      animationOptions,
      (v: AxisData) => (this.currentGrid = v),
    );
  }

  get axisScale() {
    const { xScale, yScale } = this.cartesianScale;
    const isHorizontal = this.direction === Direction.HORIZONTAL;
    return isHorizontal ? xScale : yScale;
  }

  render() {
    const { currentGrid, tickLength, color } = this;

    if (!currentGrid.ticks.length) {
      return null;
    }

    return (
      <g class="ez-grid-lines">
        {currentGrid.ticks.map((tick: AxisTick, index: number) => (
          <line
            key={index}
            transform={transformTranslate(tick.transform)}
            x2={getAxisTickByCoordinate(-1 * (tick.line.x2 || 0), tickLength)}
            y2={getAxisTickByCoordinate(tick.line.y2 || 0, tickLength)}
            stroke={color}
            class="ez-grid-line"
          />
        ))}
      </g>
    );
  }
}
