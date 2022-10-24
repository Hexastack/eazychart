import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import { ChartContext, AreaCurve, AreaData } from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { defaultColor, generateAreaPath } from 'eazychart-core/src';
import AnimationMixin from '@/lib/AnimationMixin';

@Component
export default class AreaPath extends mixins(AnimationMixin) {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @Prop({
    type: Array as PropType<AreaData>,
    default() {
      return [];
    },
  })
  private readonly shapeData!: AreaData;

  @Prop({
    type: String as PropType<AreaCurve>,
    default() {
      return 'curveLinear';
    },
  })
  private readonly curve!: AreaCurve;

  @Prop({
    type: Number,
  })
  private readonly beta!: number;

  @Prop({
    type: String,
    default() {
      return defaultColor;
    },
  })
  private readonly fill!: string;

  @Prop({
    type: String,
    default() {
      return '1';
    },
  })
  private readonly opacity!: number;

  private currentShapeData = '';

  get animationArguments() {
    const path = generateAreaPath(this.shapeData, this.curve, this.beta);
    return {
      from: this.currentShapeData,
      to: path,
      options: this.chart.animationOptions,
      onUpdate: (v: string) => (this.currentShapeData = v),
      dependencies: ['shapeData', 'curve', 'beta'],
    };
  }

  render() {
    const { currentShapeData, fill, opacity } = this;
    return (
      <path
        d={currentShapeData}
        stroke={'none'}
        stroke-width={0}
        fill={fill}
        opacity={opacity}
        stroke-linejoin={'round'}
        stroke-linecap={'round'}
        class="ez-area-path"
      />
    );
  }
}
