import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  GeoJsonData,
  ChartPadding,
  Dimensions,
  MapConfig,
  AnimationOptions,
  RawData,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import Chart from '@/components/Chart';
import Axis from '@/components/scales/Axis';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Grid from '@/components/scales/grid/Grid';
import Map from '@/components/Map';
import ColorScale from '@/components/scales/ColorScale';
import { BubbleConfig, GeoFeatureDatum } from 'eazychart-core/src/utils/types';
import SqrtScale from '@/components/scales/SqrtScale';
import Point from '@/components/shapes/Point';
import { ScaleSqrt } from 'eazychart-core/src';

@Component({
  components: {
    Chart,
    Grid,
    Map,
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
        minRange: 0,
        maxRange: 30,
        opacity: 0.5,
        fill: 'orange',
        stroke: 'black',
      };
    },
  })
  private readonly bubbles!: BubbleConfig;

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
      stroke: 'black',
      fill: 'white',
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
      bubbles,
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
        <SqrtScale
          domainKey={bubbles.domainKey}
          definition={{
            domain: [0, 100],
            range: [bubbles.minRange, bubbles.maxRange],
          }}
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
              bubbles={bubbles}
              scopedSlots={{
                default: ({
                  shapeData,
                  scales,
                }: {
                  shapeData: GeoFeatureDatum[];
                  scales: { rScale: ScaleSqrt };
                }) => (
                  <g class="ez-area">
                    {shapeData.map((shapeDatum) => (
                        <Point
                          key={shapeDatum.id}
                          shapeDatum={shapeDatum}
                          r={scales.rScale.scale((shapeDatum as any).radius)}
                          fill={shapeDatum.color}
                          stroke={bubbles.stroke}
                          strokeWidth={1}
                          opacity={bubbles.opacity}
                        />
                    ))}
                  </g>
                ),
              }}
            />
          </ColorScale>
        </SqrtScale>
      </Chart>
    );
  }
}
