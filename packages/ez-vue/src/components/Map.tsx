import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  MapConfig,
  GeoFeatureCollection,
  ChartContext,
  AnyScale,
  BubbleConfig,
} from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import MapPath from '@/components/shapes/MapPath';
import {
  calculateGeoProjectionCenter,
  scaleGeoFeatureData,
} from 'eazychart-core/src';

@Component({ components: { MapPath } })
export default class Map extends Vue {
  @Prop({
    type: Object as PropType<MapConfig>,
  })
  private readonly map!: MapConfig;

  @Prop({
    type: Object as PropType<GeoFeatureCollection>,
  })
  private readonly geoJson!: GeoFeatureCollection;

  @Prop({
    type: Object as PropType<BubbleConfig>,
  })
  private readonly bubbles?: BubbleConfig;

  @InjectReactive('colorScale')
  private colorScale!: AnyScale;

  @InjectReactive('chart')
  private chart!: ChartContext;

  @InjectReactive('sqrtScale')
  private rScale!: AnyScale;

  get projectionCenter() {
    const { geoJson, chart, map } = this;
    const { dimensions } = chart;
    const { projectionType } = map;
    return calculateGeoProjectionCenter(geoJson, projectionType, dimensions);
  }

  get shapeData() {
    const {
      geoJson, chart, colorScale, map, projectionCenter, bubbles,
    } = this;
    const { data } = chart;
    const {
      geoDomainKey, valueDomainKey, fill, projectionType,
    } = map;
    return scaleGeoFeatureData(
      data,
      geoJson?.features || [],
      geoDomainKey,
      valueDomainKey,
      colorScale,
      fill,
      projectionType,
      projectionCenter,
      bubbles?.domainKey,
    );
  }

  render() {
    const {
      map, projectionCenter, shapeData, $scopedSlots, rScale,
    } = this;

    return (
      <g class="ez-map">
        {shapeData.map((shapeDatum, idx) => (
          <g>
            <MapPath
              key={idx}
              shapeDatum={shapeDatum}
              projectionType={map.projectionType}
              projectionCenter={projectionCenter}
              stroke={map.stroke}
            />
          </g>
        ))}
        <g>
          {$scopedSlots.default ? (
            <g class="ez-map-bubble">
              {$scopedSlots.default({
                shapeData,
                scales: { rScale },
              })}
            </g>
          ) : null}
        </g>
      </g>
    );
  }
}
