import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import {
  ChartContext,
  GeoJsonFeature,
  ProjectionType,
  ShapeDatum,
  TooltipContext,
} from 'eazychart-core/src/types';
import { Inject, InjectReactive, Prop } from 'vue-property-decorator';
import { defaultColor, generateGeoFeaturePath } from 'eazychart-core/src';
import AnimationMixin from '@/lib/AnimationMixin';

@Component
export default class MapPath extends mixins(AnimationMixin) {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @Inject('tooltip')
  private tooltip!: TooltipContext;

  @Prop({
    type: Object as PropType<ShapeDatum>,
  })
  private readonly shapeDatum!: ShapeDatum;

  @Prop({
    type: Object as PropType<GeoJsonFeature>,
    default() {
      return {};
    },
  })
  private readonly feature!: GeoJsonFeature;

  @Prop({
    type: String as PropType<ProjectionType>,
    default() {
      return 'geoMercator';
    },
  })
  private readonly projectionType!: ProjectionType;

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

  private currentShapeData = '';

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
    const path = generateGeoFeaturePath(this.feature, this.projectionType);

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
        'path',
        'shapeDatum',
      ],
    };
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    const {
      currentShapeData,
      stroke,
      strokeWidth,
      fill,
      handleMouseOver,
      handleMouseMove,
      handleMouseLeave,
    } = this;

    return (
      <path
        d={currentShapeData}
        stroke={stroke}
        stroke-width={strokeWidth}
        fill={fill}
        stroke-linejoin={'round'}
        stroke-linecap={'round'}
        onMouseover={handleMouseOver}
        onMousemove={handleMouseMove}
        onMouseleave={handleMouseLeave}
        class="ez-map-path"
      />
    );
  }
}
