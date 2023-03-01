import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import {
  ChartContext,
  GeoFeatureDatum,
  GeoProjectionCenter,
  GeoProjectionType,
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
    type: Object as PropType<GeoFeatureDatum>,
  })
  private readonly shapeDatum!: GeoFeatureDatum;

  @Prop({
    type: String as PropType<GeoProjectionType>,
    default() {
      return 'geoMercator';
    },
  })
  private readonly projectionType!: GeoProjectionType;

  @Prop({
    type: Object as PropType<GeoProjectionCenter>,
    required: true,
  })
  private readonly projectionCenter!: GeoProjectionCenter;

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
      return defaultColor;
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
    const { shapeDatum, projectionType, projectionCenter } = this;
    const { dataPath } = generateGeoFeaturePath(
      shapeDatum,
      projectionType,
      projectionCenter,
    );

    return {
      from: this.currentShapeData,
      to: dataPath || '',
      options: this.chart.animationOptions,
      onUpdate: (v: string) => (this.currentShapeData = v),
      dependencies: ['shapeDatum', 'projectionType', 'projectionCenter'],
    };
  }

  render() {
    const {
      shapeDatum,
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
        stroke={stroke || shapeDatum.color}
        stroke-width={strokeWidth}
        fill={shapeDatum.color || fill}
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
