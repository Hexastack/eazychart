import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  MapConfig,
  GeoJSONData,
  ShapeDatum,
  ChartContext,
} from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import MapPath from '@/components/shapes/MapPath';
import { ScaleQuantile } from 'eazychart-core';

@Component({ components: { MapPath } })
export default class Map extends Vue {
  @Prop({
    type: Object as PropType<MapConfig>,
  })
  private readonly map!: MapConfig;

  @Prop({
    type: Object as PropType<GeoJSONData>,
  })
  private readonly mapData!: GeoJSONData;

  @InjectReactive('colorScale')
  private colorScale!: ScaleQuantile;

  @InjectReactive('chart')
  private chart!: ChartContext;

  render() {
    // eslint-disable-next-line object-curly-newline
    const { map, mapData, colorScale } = this;
    const { data } = this.chart;

    return (
      <g class="ez-segments">
        {mapData.features.map((feature, idx) => {
          const datum = data.find(
            // eslint-disable-next-line no-shadow
            (datum) => feature.properties
            && datum[map.geoDomainKey] === feature.properties[map.geoDomainKey],
          );

          const color = datum
            ? colorScale.scale(datum[map.valueDomainKey] as number)
            : map.fill;

          return (
            <MapPath
              key={idx}
              shapeDatum={{ id: datum?.id || '', color } as ShapeDatum}
              feature={feature}
              projectionType={map.projectionType}
              stroke={map.stroke}
              fill={color}
            />
          );
        })}
      </g>
    );
  }
}
