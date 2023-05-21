import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import { ChartContext, ArcDatum, TooltipContext } from 'eazychart-core/src/types';
import {
  Inject,
  InjectReactive,
  Prop,
} from 'vue-property-decorator';
import { generateArc } from 'eazychart-core/src';
import AnimationMixin from '@/lib/AnimationMixin';

@Component
export default class Arc extends mixins(AnimationMixin) {
  @Inject('tooltip')
  private tooltip!: TooltipContext;

  @InjectReactive('chart')
  private chart!: ChartContext;

  @Prop({
    type: Object as PropType<ArcDatum>,
    required: true,
  })
  private readonly shapeDatum!: ArcDatum;

  @Prop({
    type: Number,
    required: true,
  })
  private readonly innerRadius!: number;

  @Prop({
    type: Number,
    required: true,
  })
  private readonly outerRadius!: number;

  @Prop({
    type: Number,
    default: 0,
  })
  private readonly cornerRadius!: number;

  @Prop({
    type: Number,
    default: 0,
  })
  private readonly padAngle!: number;

  @Prop({
    type: Number,
    default: 0,
  })
  private readonly padRadius!: number;

  @Prop({
    type: String,
  })
  private readonly stroke!: string;

  @Prop({
    type: Number,
  })
  private readonly strokeWidth!: number;

  private currentShapeDatum: ArcDatum = {
    ...this.shapeDatum,
    color: '#FFF',
    startAngle: this.shapeDatum?.startAngle,
    endAngle: this.shapeDatum?.startAngle,
  };

  // The following is a workaround to make unit tests work
  // It seems in test environement, the props are undefined
  data(): { currentShapeDatum: ArcDatum } {
    return {
      currentShapeDatum: {
        ...this.shapeDatum,
        color: '#FFF',
        startAngle: this.shapeDatum.startAngle,
        endAngle: this.shapeDatum.startAngle,
      },
    };
  }

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
      onUpdate: (v: ArcDatum) => (this.currentShapeDatum = v),
      dependencies: ['shapeDatum'],
    };
  }

  get path() {
    return generateArc(
      this.currentShapeDatum,
      this.outerRadius,
      this.innerRadius,
      this.cornerRadius,
      this.padAngle,
      this.padRadius,
    );
  }

  render() {
    const {
      path,
      shapeDatum,
      stroke,
      strokeWidth,
      handleMouseOver,
      handleMouseMove,
      handleMouseLeave,
      handleClick,
    } = this;
    return (
      <path
        d={path || ''}
        fill={shapeDatum.color}
        stroke={stroke || shapeDatum.color}
        stroke-width={strokeWidth}
        onMouseover={handleMouseOver}
        onMousemove={handleMouseMove}
        onMouseleave={handleMouseLeave}
        onClick={handleClick}
        class="ez-arc"
        data-testid="ez-arc"
      />
    );
  }
}
