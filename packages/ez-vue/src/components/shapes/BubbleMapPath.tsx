import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import {
  ChartContext,
  GeoFeatureDatum,
  GeoProjectionCenter,
  GeoProjectionType,
  TooltipContext,
  centroidsRecord,
} from 'eazychart-core/src/types';
import { BubbleConfig } from 'eazychart-core/src/utils/types';
import { Inject, InjectReactive, Prop } from 'vue-property-decorator';
import {
  defaultColor,
  generateGeoFeaturePath,
  scaler,
} from 'eazychart-core/src';
import AnimationMixin from '@/lib/AnimationMixin';

@Component
export default class BubbleMapPath extends mixins(AnimationMixin) {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @Inject('tooltip')
  private tooltip!: TooltipContext;

  @Prop({
    type: Object as PropType<GeoFeatureDatum>,
  })
  private readonly shapeDatum!: GeoFeatureDatum;

  @Prop({
    type: Object as PropType<BubbleConfig>,
  })
  private readonly bubbles!: BubbleConfig;

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

  private centroids: centroidsRecord = {};

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

  // Returns the feature value if it exists
  getValueById(id: number): number {
    const featureData = this.chart.data.find((data) => Number(data.id) === id);
    return (featureData ? featureData.value : 0) as number;
  }

  get animationArguments() {
    const { shapeDatum, projectionType, projectionCenter } = this;
    const { dataPath, centroids } = generateGeoFeaturePath(
      shapeDatum,
      projectionType,
      projectionCenter,
      Number(shapeDatum.id),
    ) as { dataPath: string | null; centroids: centroidsRecord };

    this.centroids = centroids;

    return {
      from: this.currentShapeData,
      to: dataPath || '',
      options: this.chart.animationOptions,
      onUpdate: (v: string) => (this.currentShapeData = v),
      dependencies: ['shapeDatum', 'projectionType', 'projectionCenter'],
      centroids,
    };
  }

  render() {
    const {
      shapeDatum,
      currentShapeData,
      bubbles,
      stroke,
      strokeWidth,
      fill,
      getValueById,
      centroids,
      handleMouseOver,
      handleMouseMove,
      handleMouseLeave,
    } = this;

    return (
      <g>
        <path
          d={currentShapeData}
          stroke={stroke}
          stroke-width={strokeWidth}
          fill={fill}
          stroke-linejoin={'round'}
          stroke-linecap={'round'}
          class="ez-map-path"
        />
        <circle
          stroke={bubbles.stroke}
          fill={shapeDatum.color || fill}
          key={shapeDatum.id}
          r={scaler(
            bubbles.minRange,
            bubbles.maxRange,
            getValueById(Number(shapeDatum.id)),
          )}
          cx={centroids ? centroids[Number(shapeDatum.id || 0)]?.x : 0}
          cy={centroids ? centroids[Number(shapeDatum.id || 0)]?.y : 0}
          onMouseover={handleMouseOver}
          onMousemove={handleMouseMove}
          onMouseleave={handleMouseLeave}
          opacity={bubbles.opacity}
          stroke-width={1}
          data-testid="ez-point"
        />
      </g>
    );
  }
}
