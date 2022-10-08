import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { InjectReactive, Prop, Watch } from 'vue-property-decorator';
import {
  defaultAxis,
  getAxis,
  getAxisLabelAttributes,
  getAxisPath,
  getAxisTickByCoordinate,
  getAxisTitleProps,
  getTickTextAnchorByPosition,
  transformTranslate,
  animate,
  isVerticalPosition,
} from 'eazychart-core/src';
import {
  Anchor,
  ChartContext,
  Position,
  AxisData,
  ScaleLinearOrBand,
} from 'eazychart-core/src/types';

@Component
export default class Axis extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @InjectReactive('cartesianScale')
  private cartesianScale!: {
    xScale: ScaleLinearOrBand;
    yScale: ScaleLinearOrBand;
  };

  @Prop({
    type: String as PropType<Position>,
    default() {
      return Position.LEFT;
    },
  })
  private readonly position!: Position;

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
    type: Number,
    default: 6,
  })
  private readonly tickSize!: number;

  @Prop({
    type: Function,
    default: null,
  })
  private readonly tickFormat!: Function;

  @Prop({
    type: String,
    default: null,
  })
  private readonly title!: string;

  @Prop({
    type: String,
    default: Anchor.MIDDLE,
  })
  private readonly titleAlign!: Anchor;

  private currentAxis: AxisData = defaultAxis;

  private cancelAnimation: Function | null = null;

  private axisLabelTransform = {
    textAnchor: Anchor.MIDDLE,
    transform: 'translate(0, 0) rotate(0 0 0)',
  };

  updateCurrentAxis() {
    this.cancelAnimation && this.cancelAnimation();
    const axis = getAxis(
      this.position,
      this.axisScale.scale,
      this.chart.dimensions,
      {
        tickCount: this.tickCount,
        tickSize: this.tickSize,
        tickFormat: this.tickFormat,
      },
    );
    this.cancelAnimation = animate(
      this.currentAxis,
      axis,
      this.chart.animationOptions,
      (v: AxisData) => (this.currentAxis = v),
    );
  }

  getTick(tick = 0) {
    return getAxisTickByCoordinate(tick, this.tickLength);
  }

  updateAxisLabelTransform() {
    this.$nextTick(() => {
      const axisElement = this.$refs.axis as SVGGraphicsElement;
      const labels = Array.from(
        axisElement?.querySelectorAll('.ez-axis-tick-text'),
      ) as SVGGraphicsElement[];
      this.axisLabelTransform = getAxisLabelAttributes(
        this.axisScale.scale,
        labels,
        this.position,
        'auto',
        this.aScale.definition.reverse,
      );
    });
  }

  created() {
    this.updateCurrentAxis();
    this.updateAxisLabelTransform();
  }

  @Watch('axisScale', { deep: true })
  onScalesChange() {
    this.updateCurrentAxis();
  }

  @Watch('position')
  onPositionChange() {
    this.updateCurrentAxis();
  }

  @Watch('currentAxis')
  onAxisChange() {
    this.updateAxisLabelTransform();
  }

  get axisScale() {
    const { position, cartesianScale } = this;
    const { xScale, yScale } = cartesianScale;
    return isVerticalPosition(position) ? yScale : xScale;
  }

  get textAnchor() {
    return getTickTextAnchorByPosition(this.position);
  }

  get currentAxisTransform() {
    return transformTranslate({
      x: this.currentAxis.x,
      y: this.currentAxis.y,
    });
  }

  get axisPath() {
    return getAxisPath(this.currentAxis.path, this.position);
  }

  get titleProps() {
    return getAxisTitleProps(
      this.position,
      this.chart.dimensions,
      this.chart.padding,
      this.titleAlign,
    );
  }

  render() {
    const {
      title,
      titleProps,
      textAnchor,
      currentAxisTransform,
      axisLabelTransform,
      axisPath,
      currentAxis,
      getTick,
    } = this;
    return (
      <g
        class="ez-axis"
        text-anchor={textAnchor}
        transform={currentAxisTransform}
        ref="axis"
      >
        <path class="ez-axis-path" d={axisPath}></path>
        {currentAxis.ticks.map((tick, index) => (
          <g
            key={index}
            class="ez-axis-tick"
            transform={transformTranslate(tick.transform)}
          >
            <line
              class="ez-axis-tick-line"
              x2={getTick(tick.line.x2)}
              y2={getTick(tick.line.y2)}
            />
            <text
              x={tick.text.x}
              y={tick.text.y}
              dy={`${tick.text.dy}em`}
              text-anchor={axisLabelTransform.textAnchor}
              transform={axisLabelTransform.transform}
              class="ez-axis-tick-text"
            >
              {tick.text.text.toString().replace(/(\.\d{1}).*$/, (_a, c) => c)}
            </text>
          </g>
        ))}
        {title && (
          <text
            text-anchor={titleProps.textAnchor}
            transform={titleProps.transform}
            dy={titleProps.dy}
            alignment-baseline={'middle'}
            class="ez-axis-title"
          >
            {title}
          </text>
        )}
      </g>
    );
  }
}
