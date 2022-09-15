import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import {
  ChartContext,
  RectangleDatum,
  TooltipContext,
} from '@ez/core/src/types';
import { defaultRectangleDatum } from '@ez/core/src';
import {
  Inject, InjectReactive, Prop,
} from 'vue-property-decorator';
import AnimationMixin from '@/lib/AnimationMixin';

@Component
export default class Bar extends mixins(AnimationMixin) {
  @Inject('tooltip')
  private tooltip!: TooltipContext;

  @InjectReactive('chart')
  private chart!: ChartContext;

  @Prop({
    type: Object as PropType<RectangleDatum>,
    default() {
      return defaultRectangleDatum;
    },
  })
  private readonly shapeDatum!: RectangleDatum;

  private currentShapeDatum: RectangleDatum = defaultRectangleDatum;

  handleMouseOver(event: MouseEvent) {
    this.tooltip.showTooltip(this.shapeDatum, event);
  }

  handleMouseMove(event: MouseEvent) {
    this.tooltip.moveTooltip(this.shapeDatum, event);
  }

  handleMouseLeave(event: MouseEvent) {
    this.tooltip.hideTooltip(this.shapeDatum, event);
  }

  get animationArguments() {
    return {
      from: this.currentShapeDatum,
      to: this.shapeDatum,
      options: this.chart.animationOptions,
      onUpdate: (v: RectangleDatum) => (this.currentShapeDatum = v),
      dependencies: ['shapeDatum'],
    };
  }

  render() {
    const {
      currentShapeDatum,
      handleMouseOver,
      handleMouseMove,
      handleMouseLeave,
    } = this;
    const {
      color, x, y, width, height,
    } = currentShapeDatum;
    return (
      <rect
        class="ez-bar"
        fill={color}
        x={x}
        y={y}
        width={width}
        height={height}
        onMouseover={handleMouseOver}
        onMousemove={handleMouseMove}
        onMouseleave={handleMouseLeave}
        data-testid="ez-bar"
      />
    );
  }
}
