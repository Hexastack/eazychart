import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  MapConfig,
  Dimensions,
  ChartPadding,
  GeoJSONData,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import MapPath from '@/components/shapes/MapPath';

@Component({ components: { MapPath } })
export default class Map extends Vue {
  @Prop({
    type: {} as PropType<Dimensions>,
    required: true,
  })
  private readonly dimensions!: Partial<Dimensions>;

  @Prop({
    type: {} as PropType<ChartPadding>,
    required: true,
  })
  private readonly padding!: Partial<ChartPadding>;

  @Prop({
    type: Object as PropType<MapConfig>,
  })
  private readonly map!: MapConfig;

  @Prop({
    type: Object as PropType<[GeoJSONData]>,
  })
  private readonly mapData!: [GeoJSONData];

  render() {
    // eslint-disable-next-line object-curly-newline
    const { map, mapData, dimensions, padding } = this;

    return (
      <g class="ez-segments">
        {mapData.map((e: any, idx: number) => (
          <MapPath
            key={idx}
            feature={e}
            projectionType={map.projectionType}
            stroke={map.stroke}
            fill={map.fill}
            scale={map.scale}
            width={dimensions.width}
            height={dimensions.height}
            padding={padding}
          />
        ))}
      </g>
    );
  }
}
