import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import {
  ChartContext,
  ChartPadding,
  GeoJsonFeature,
  ProjectionTypes,
} from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { defaultColor, mapProjection } from 'eazychart-core/src';
import AnimationMixin from '@/lib/AnimationMixin';

@Component
export default class MapPath extends mixins(AnimationMixin) {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @Prop({
    type: {} as PropType<ChartPadding>,
    default() {
      return {};
    },
  })
  private readonly padding!: Partial<ChartPadding>;

  @Prop({
    type: {} as PropType<GeoJsonFeature>,
    default() {
      return {};
    },
  })
  private readonly feature!: GeoJsonFeature;

  @Prop({
    type: String as PropType<ProjectionTypes>,
    default() {
      return 'geoMercator';
    },
  })
  private readonly projectionType!: ProjectionTypes;

  @Prop({
    type: Number,
    default() {
      return 100;
    },
  })
  private readonly scale!: number;

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

  @Prop({
    type: String,
    default() {
      return 'blue';
    },
  })
  private readonly fill!: string;

  @Prop({
    type: Number,
    default() {
      return 800;
    },
  })
  private readonly width!: number;

  @Prop({
    type: Number,
    default() {
      return 600;
    },
  })
  private readonly height!: number;

  private currentShapeData = '';

  get animationArguments() {
    const path = mapProjection(
      this.scale,
      this.width,
      this.height,
      this.padding,
      this.projectionType,
      this.feature,
    );

    return {
      from: this.currentShapeData,
      to: path || '',
      options: this.chart.animationOptions,
      onUpdate: (v: string) => (this.currentShapeData = v),
      dependencies: [
        'scale',
        'width',
        'height',
        'padding',
        'projectionType',
        'feature',
      ],
    };
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    const { currentShapeData, stroke, strokeWidth, fill } = this;
    return (
      <path
        d={currentShapeData}
        stroke={stroke}
        stroke-width={strokeWidth}
        fill={fill}
        stroke-linejoin={'round'}
        stroke-linecap={'round'}
        class="ez-map-path"
      />
    );
  }
}
