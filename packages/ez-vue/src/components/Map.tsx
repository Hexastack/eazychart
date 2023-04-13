import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  MapConfig,
  GeoFeatureCollection,
  ChartContext,
  AnyScale,
  MapContext,
  GeoProjectionViewport,
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

  private projectionViewPort: GeoProjectionViewport = {
    scale: 3245.9683663289666,
    center: [-108.12968310294252, 40.49228863865995],
    offset: [399.7007419894367, 302.1284346877323],
  };

  @ProvideReactive('mapContext')
  // @ts-ignore
  private mapContext: MapContext = {
    ...this.mapProjection,
    mapData: [],
  };

  get shapeData() {
    const {
      geoJson, chart, colorScale, map, mapProjection,
    } = this;
    const { data } = chart;
    const { geoDomainKey, valueDomainKey, fill } = map;

    return scaleGeoFeatureData(
      data,
      geoJson?.features || [],
      geoDomainKey,
      valueDomainKey,
      mapProjection.geoPathGenerator,
      colorScale,
      fill,
    );
  }

  @Watch('chart.dimensions')
  @Watch('projectionViewPort')
  onMapContextChange() {
    this.mapContext = {
      ...this.mapProjection,
      mapData: this.shapeData,
    };
  }

  @Watch('map.projectionType')
  @Watch('chart.dimensions')
  onChartChange() {
    const { geoJson, chart, map } = this;
    const { dimensions } = chart;
    const { projectionType } = map;
    this.projectionViewPort = calculateGeoProjectionViewport(
      geoJson,
      projectionType,
      dimensions,
    );
  }

  get mapProjection(): Omit<MapContext, 'mapData'> {
    const { projectionViewPort, map } = this;
    const { projectionType } = map;
    return {
      ...computeMapProjection(projectionType, projectionViewPort),
    };
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
