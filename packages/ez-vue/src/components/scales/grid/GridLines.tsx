import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { InjectReactive, Prop, Watch } from 'vue-property-decorator';
import {
  defaultAxis,
  getAxisTickByCoordinate,
  getGrid,
  transformTranslate,
  animate,
  ScaleBand,
  ScaleLinear,
} from 'eazychart-core/src';
import {
  ChartContext, Direction, AxisData, AxisTick,
} from 'eazychart-core/src/types';

@Component
export default class GridLines extends Vue {
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
    type: Object as PropType<ScaleBand | ScaleLinear>,
    required: true,
  })
  private readonly aScale!: ScaleBand | ScaleLinear;

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
    type: Function,
    default: null,
  })
  private readonly tickFormat!: Function;

  @Prop({
    type: String,
    default: '#a8a8a8',
  })
  private readonly color!: string;

  private currentGrid: AxisData = defaultAxis;

  private cancelAnimation: Function | null = null;

  updateCurrentGrid() {
    this.cancelAnimation && this.cancelAnimation();
    const axis = getGrid(
      this.direction,
      this.aScale.scale,
      this.chart.dimensions,
      {
        tickCount: this.tickCount,
        tickSize:
          this.direction === Direction.HORIZONTAL
            ? this.chart.dimensions.width
            : this.chart.dimensions.height,
        tickFormat: this.tickFormat,
      },
    );
    this.cancelAnimation = animate(
      this.currentGrid,
      axis,
      this.chart.animationOptions,
      (v: AxisData) => (this.currentGrid = v),
    );
  }

  created() {
    this.updateCurrentGrid();
  }

  @Watch('aScale', { deep: true })
  onScalesChange() {
    this.updateCurrentGrid();
  }

  @Watch('direction')
  onPositionChange() {
    this.updateCurrentGrid();
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
            x2={getAxisTickByCoordinate(-(tick.line.x2 || 0), tickLength)}
            y2={getAxisTickByCoordinate(tick.line.y2 || 0, tickLength)}
            stroke={color}
            class="ez-grid-line"
          />
        ))}
      </g>
    );
  }
}
