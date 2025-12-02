import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import {
  AnimationOptions,
  NormalizedDatum,
  Point,
  ShapeDatum,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import {
  defaultTooltipOffset,
  initialTooltipStyle,
  tooltipAnimationOptions,
} from 'eazychart-core/src';
import AnimationMixin from '@/lib/AnimationMixin';

type TooltipAnimationStyle = {
  left: string;
  top: string;
  opacity: number;
};

export interface TooltipProps {
  offset?: Point;
  datum: NormalizedDatum | null;
  shapeDatum: ShapeDatum | null;
  isVisible: boolean;
  mousePosition: Point;
}

@Component
export default class Tooltip extends mixins(AnimationMixin) {
  @Prop({
    type: Object as PropType<Point>,
    default() {
      return defaultTooltipOffset;
    },
  })
  private readonly offset!: Point;

  @Prop({
    type: Object as PropType<NormalizedDatum>,
    default() {
      return null;
    },
  })
  private readonly datum!: NormalizedDatum | null;

  @Prop({
    type: Object as PropType<ShapeDatum>,
    default() {
      return null;
    },
  })
  private readonly shapeDatum!: ShapeDatum | null;

  @Prop({
    type: Boolean,
    default() {
      return false;
    },
  })
  private readonly isVisible!: boolean;

  @Prop({
    type: Object as PropType<Point>,
    default() {
      return { x: 0, y: 0 };
    },
  })
  private readonly mousePosition!: Point;

  @Prop({
    type: Object as PropType<AnimationOptions>,
    default() {
      return tooltipAnimationOptions;
    },
  })
  private readonly animationOptions!: AnimationOptions;

  private animatedStyle: TooltipAnimationStyle = initialTooltipStyle;

  get targetStyle() {
    return {
      left: `${
        this.mousePosition.x ? this.mousePosition.x + this.offset.x : 0
      }px`,
      top: `${
        this.mousePosition.y ? this.mousePosition.y + this.offset.y : 0
      }px`,
      opacity: this.isVisible ? 1.0 : 0.0,
    };
  }

  get animationArguments() {
    return {
      from: this.animatedStyle,
      to: this.targetStyle,
      options: this.animationOptions,
      onUpdate: (v: TooltipAnimationStyle) => (this.animatedStyle = v),
      dependencies: ['targetStyle'],
    };
  }

  render() {
    const { animatedStyle, datum, shapeDatum } = this;

    const {
      id: _id, color: _color, label: _label, ...attributes
    } = datum || { color: undefined };

    return datum ? (
      <div class="ez-tooltip" style={animatedStyle}>
        {shapeDatum?.color && (
          <div
            class="ez-tooltip-color"
            style={{ backgroundColor: shapeDatum.color }}
          ></div>
        )}
        <div class="ez-tooltip-text">
          {Object.keys(attributes).map((attribute) => (
            <div key={attribute} class={`ez-tooltip-attribute ${attribute}`}>
              <div class="ez-tooltip-attribute--name">{attribute} :</div>
              <div class="ez-tooltip-attribute--value">
                {datum[attribute] as string}
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div class="ez-tooltip"></div>
    );
  }
}
