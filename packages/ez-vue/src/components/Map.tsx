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
    scale: 150,
    center: [0, 0],
    offset: [0, 0],
  };

  get shapeData() {
    const {
      geoJson, chart, colorScale, map,
    } = this;
    const { data } = chart;
    const { geoDomainKey, valueDomainKey, fill } = map;
    return scaleGeoFeatureData(
      data,
      geoJson?.features || [],
      geoDomainKey,
      valueDomainKey,
      colorScale,
      fill,
    );
  }

  @ProvideReactive('mapContext')
  // @ts-ignore
  private mapContext: MapContext = {
    ...this.mapChartContext,
    mapData: [],
  };

  @Watch('shapeData')
  @Watch('chart.dimensions')
  onMapContextChange() {
    this.mapContext = { ...this.mapChartContext, mapData: this.shapeData };
  }

  @Watch('projectionType')
  @Watch('shapeData')
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

  get mapChartContext(): Omit<MapContext, 'mapData'> {
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
          <MapPath
            key={idx}
            shapeDatum={shapeDatum}
            stroke={map.stroke}
          />
        ))}

        {$scopedSlots.default ? (
          <g class="ez-map-bubble">{$scopedSlots.default({})}</g>
        ) : null}
      </g>
    );
  }
}
