import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  MapConfig,
  GeoFeatureCollection,
  ChartContext,
  AnyScale,
  MapContext,
  GeoProjection,
} from 'eazychart-core/src/types';
import {
  InjectReactive,
  Prop,
  ProvideReactive,
  Watch,
} from 'vue-property-decorator';
import MapPath from '@/components/shapes/MapPath';
import {
  calculateGeoProjectionViewport,
  computeMapProjection,
  scaleGeoFeatureData,
} from 'eazychart-core/src';
import { defaultChartDimensions } from 'eazychart-core';

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

  @InjectReactive('colorScale')
  private colorScale!: AnyScale;

  @InjectReactive('chart')
  private chart!: ChartContext;

  @ProvideReactive('mapContext')
  // @ts-ignore
  private mapContext: MapContext = {
    projection: this.mapProjection,
    mapData: [],
  };

  get shapeData() {
    const { geoJson, chart, colorScale, map, mapProjection } = this;
    const { data } = chart;
    const { geoDomainKey, valueDomainKey, fill } = map;

    return scaleGeoFeatureData(
      data,
      geoJson?.features || [],
      geoDomainKey,
      valueDomainKey,
      mapProjection,
      colorScale,
      fill,
    );
  }

  @Watch('chart.dimensions')
  @Watch('projectionViewPort')
  onMapContextChange() {
    this.mapContext = {
      projection: this.mapProjection,
      mapData: this.shapeData,
    };
  }

  get mapProjection(): GeoProjection {
    const { geoJson, chart, map } = this;
    const { projectionType } = map;
    const projectionViewPort = calculateGeoProjectionViewport(
      geoJson,
      projectionType,
      chart?.dimensions || defaultChartDimensions,
    );
    const projection = computeMapProjection(projectionType, projectionViewPort);
    return projection;
  }

  render() {
    const { map, shapeData, $scopedSlots } = this;
    return (
      <g class="ez-map">
        {shapeData.map((shapeDatum, idx) => (
          <MapPath key={idx} shapeDatum={shapeDatum} stroke={map.stroke} />
        ))}

        {$scopedSlots.default ? (
          <g class="ez-map-bubble">{$scopedSlots.default({})}</g>
        ) : null}
      </g>
    );
  }
}
