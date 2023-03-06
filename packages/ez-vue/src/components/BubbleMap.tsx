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
import {
  calculateGeoProjectionCenter,
  scaleGeoFeatureData,
} from 'eazychart-core/src';
import BubbleMapPath from './shapes/BubbleMapPath';

@Component({ components: { BubbleMapPath } })
export default class BubbleMap extends Vue {
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
  private readonly bubbles!: BubbleConfig;

  @InjectReactive('colorScale')
  private colorScale!: AnyScale;

  @InjectReactive('chart')
  private chart!: ChartContext;

  get projectionCenter() {
    const { geoJson, chart, map } = this;
    const { dimensions } = chart;
    const { projectionType } = map;
    return calculateGeoProjectionCenter(geoJson, projectionType, dimensions);
  }

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

  render() {
    const {
      map, projectionCenter, shapeData, bubbles,
    } = this;

    return (
      <g class="ez-map">
        {shapeData.map((shapeDatum, idx) => (
            <BubbleMapPath
              key={idx}
              shapeDatum={shapeDatum}
              projectionType={map.projectionType}
              projectionCenter={projectionCenter}
              stroke={map.stroke}
              fill={map.fill}
              bubbles={bubbles}
              />
        ))}
      </g>
    );
  }
}
