import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  GeoJSONData,
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
export default class MapChart extends Vue {
  @Prop({
    type: Object as PropType<Dimensions>,
    required: true,
  })
  private readonly dimensions!: Partial<Dimensions>;

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
    required: true,
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
  })
  private readonly map!: MapConfig;

  @Prop({
    type: Object as PropType<GeoJSONData>,
  })
  private readonly mapData!: GeoJSONData;

  @Prop({
    type: Array,
    default: () => ['red', 'blue', 'orange', 'yellow'],
  })
  private readonly colors!: string[];

  @Prop({
    type: Array as PropType<RawData>,
  })
  private readonly data!: RawData;

  render() {
    const {
      mapData,
      map,
      padding,
      animationOptions,
      $scopedSlots,
      dimensions,
      data,
      colors,
    } = this;

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
          <Map colors={colors} map={map} mapData={mapData} />
        </ColorScale>
      </Chart>
    );
  }
}
