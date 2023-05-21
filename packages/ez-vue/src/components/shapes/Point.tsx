import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import { ChartContext, PointDatum, TooltipContext } from 'eazychart-core/src/types';
import { defaultPointDatum, defaultPointRadius } from 'eazychart-core/src';
import { Inject, InjectReactive, Prop } from 'vue-property-decorator';
import AnimationMixin from '@/lib/AnimationMixin';

@Component
export default class Point extends mixins(AnimationMixin) {
  @Inject('tooltip')
  private tooltip!: TooltipContext;

  @InjectReactive('chart')
  private chart!: ChartContext;

  @Prop({
    type: Object as PropType<PointDatum>,
    default() {
      return defaultPointDatum;
    },
  })
  private readonly shapeDatum!: PointDatum;

  @Prop({
    type: Number,
    default: defaultPointRadius,
  })
  private readonly r!: number;

  @Prop({
    type: String,
    default: null,
  })
  private readonly fill!: string;

  @Prop({
    type: String,
    default: null,
  })
  private readonly stroke!: string;

  @Prop({
    type: Number,
    default: 1,
  })
  private readonly strokeWidth!: number;

  private currentShapeDatum: PointDatum = defaultPointDatum;

  handleMouseOver(event: MouseEvent) {
    this.tooltip.showTooltip(this.shapeDatum, event);
  }

  handleMouseMove(event: MouseEvent) {
    this.tooltip.moveTooltip(this.shapeDatum, event);
  }

  handleMouseLeave(event: MouseEvent) {
    this.tooltip.hideTooltip(this.shapeDatum, event);
  }

  handleClick(event: MouseEvent) {
    this.chart.onShapeClick && this.chart.onShapeClick(this.shapeDatum, event);
  }

  get animationArguments() {
    return {
      from: this.currentShapeDatum,
      to: this.shapeDatum,
      options: this.chart.animationOptions,
      onUpdate: (v: PointDatum) => this.currentShapeDatum = v,
      dependencies: ['shapeDatum'],
    };
  }

  render() {
    const {
      currentShapeDatum,
      r,
      fill,
      stroke,
      strokeWidth,
      handleMouseOver,
      handleMouseMove,
      handleMouseLeave,
      handleClick,
    } = this;
    const { color, x, y } = currentShapeDatum;
    return (
      <circle
        class="ez-point"
        stroke={stroke || color}
        fill={fill || color}
        r={r}
        cx={x}
        cy={y}
        onMouseover={handleMouseOver}
        onMousemove={handleMouseMove}
        onMouseleave={handleMouseLeave}
        onClick={handleClick}
        stroke-width={strokeWidth}
        data-testid="ez-point"
      />
    );
  }
}
