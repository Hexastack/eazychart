import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  GeoJsonData,
  ChartPadding,
  Dimensions,
  MapConfig,
  AnimationOptions,
  RawData,
  BubbleConfig,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import Chart from '@/components/Chart';
import Axis from '@/components/scales/Axis';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Grid from '@/components/scales/grid/Grid';
import Map from '@/components/Map';
import ColorScale from '@/components/scales/ColorScale';
import MapBubbles from '@/components/MapBubbles';
import SqrtScale from '@/components/scales/SqrtScale';

@Component({
  components: {
    Chart,
    Grid,
    Map,
    MapBubbles,
    Axis,
    Legend,
    Tooltip,
  },
})
export default class BubbleMapChart extends Vue {
  @Prop({
    type: Object as PropType<Dimensions>,
    default() {
      return {};
    },
  })
  private readonly dimensions!: Partial<Dimensions>;

  @Prop({
    type: Object as PropType<BubbleConfig>,
    default() {
      return {
        domainKey: 'rValue',
        minRadius: 1,
        maxRadius: 100,
        opacity: 0.5,
        stroke: 'black',
        strokeWidth: 1,
        colors: ['green', 'yellowgreen', 'yellow'],
      };
    },
  })
  private readonly bubble!: BubbleConfig;

  @Prop({
    type: Object as PropType<AnimationOptions>,
    default() {
      return {
        easing: 'easeBack',
        duration: 400,
        delay: 0,
      };
    },
  })
  private readonly animationOptions!: AnimationOptions;

  @Prop({
    type: Object as PropType<ChartPadding>,
    default() {
      return {
        left: 100,
        bottom: 100,
        right: 100,
        top: 100,
      };
    },
  })
  private readonly padding!: Partial<ChartPadding>;

  @Prop({
    type: Object as PropType<MapConfig>,
    default: () => ({
      geoDomainKey: 'geo_code',
      valueDomainKey: 'value',
      projectionType: 'geoMercator',
      stroke: 'white',
      fill: 'black',
    }),
  })
  private readonly map!: MapConfig;

  @Prop({
    type: Object as PropType<GeoJsonData>,
  })
  private readonly geoJson!: GeoJsonData;

  @Prop({
    type: Array,
    default: () => ['white', 'pink', 'red'],
  })
  private readonly colors!: string[];

  @Prop({
    type: Array as PropType<RawData>,
  })
  private readonly data!: RawData;

  render() {
    const {
      geoJson,
      map,
      padding,
      animationOptions,
      $scopedSlots,
      dimensions,
      data,
      colors,
      bubble,
    } = this;

    if (geoJson && !('features' in geoJson)) {
      throw new Error(
        'GeoJSON must contain features so that each feature is mapped to a data item.',
      );
    }

    return (
      <Chart
        dimensions={dimensions}
        padding={padding}
        animationOptions={animationOptions}
        scopedSlots={$scopedSlots}
        rawData={data}
      >
        <ColorScale
          type={'quantile'}
          definition={{
            domainKey: map.valueDomainKey,
            range: colors,
          }}
        >
          <Map
            map={map}
            geoJson={geoJson}
            scopedSlots={{
              default: () => (
                <ColorScale
                  type={'quantile'}
                  definition={{
                    domainKey: bubble.domainKey,
                    range: bubble.colors,
                  }}
                >
                  <SqrtScale
                    definition={{
                      domainKey: bubble.domainKey,
                      range: [bubble.minRadius, bubble.maxRadius],
                    }}
                  >
                    <MapBubbles
                      geoDomainKey={map.geoDomainKey}
                      rDomainKey={bubble.domainKey}
                      stroke={bubble.stroke}
                      strokeWidth={bubble.strokeWidth}
                      opacity={bubble.opacity}
                    />
                  </SqrtScale>
                </ColorScale>
              ),
            }}
          ></Map>
        </ColorScale>
      </Chart>
    );
  }
}
