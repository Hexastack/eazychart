import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import { ChartContext, PointDatum, LineCurve } from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { defaultColor, generateLinePath } from 'eazychart-core/src';
import AnimationMixin from '@/lib/AnimationMixin';

@Component
export default class LinePath extends mixins(AnimationMixin) {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @Prop({
    type: Array as PropType<PointDatum[]>,
    default() {
      return [];
    },
  })
  private readonly shapeData!: PointDatum[];

  @Prop({
    type: String as PropType<LineCurve>,
    default() {
      return 'curveLinear';
    },
  })
  private readonly curve!: LineCurve;

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
  private readonly stroke!: string;

  @Prop({
    type: Number,
    default() {
      return 1;
    },
  })
  private readonly strokeWidth!: number;

  private currentShapeData = '';

  get animationArguments() {
    const path = generateLinePath(this.shapeData, this.curve, this.beta);
    return {
      from: this.currentShapeData,
      to: path,
      options: this.chart.animationOptions,
      onUpdate: (v: string) => this.currentShapeData = v,
      dependencies: ['shapeData', 'curve', 'beta'],
    };
  }

  render() {
    const { currentShapeData, stroke, strokeWidth } = this;
    return <path
      d={currentShapeData}
      stroke={stroke}
      stroke-width={strokeWidth}
      fill="none"
      stroke-linejoin={'round'}
      stroke-linecap={'round'}
      class="ez-line"
      data-testid="ez-line"
    />;
  }
}
