import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';

import {
  ChartContext,
  GeoFeatureDatum,
  MapContext,
  TooltipContext,
} from 'eazychart-core/src/types';
import { Inject, InjectReactive, Prop } from 'vue-property-decorator';
import { defaultColor, getGeoPathByProjection } from 'eazychart-core/src';
import AnimationMixin from '@/lib/AnimationMixin';

@Component
export default class MapPath extends mixins(AnimationMixin) {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @InjectReactive('mapContext')
  private mapContext!: MapContext;

  @Inject('tooltip')
  private tooltip!: TooltipContext;

  @Prop({
    type: Object as PropType<GeoFeatureDatum>,
  })
  private readonly shapeDatum!: GeoFeatureDatum;

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
    const { shapeDatum } = this;
    const geoPathGenerator = getGeoPathByProjection(this.mapContext.projection);
    const path = geoPathGenerator(shapeDatum.feature) || '';
    return {
      from: this.currentShapeData,
      to: path || '',
      options: this.chart.animationOptions,
      onUpdate: (v: string) => (this.currentShapeData = v),
      dependencies: ['shapeDatum', 'mapContext'],
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
