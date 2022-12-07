import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  GeoJSONData,
  ChartPadding,
  Dimensions,
  MapConfig,
  AnimationOptions,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import Chart from '@/components/Chart';
import Axis from '@/components/scales/Axis';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Grid from '@/components/scales/grid/Grid';
import Map from '@/components/Map';

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
    type: {} as PropType<Dimensions>,
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
    type: {} as PropType<ChartPadding>,
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
    type: Object as PropType<[GeoJSONData]>,
  })
  private readonly mapData!: [GeoJSONData];

  @Prop({
    type: Boolean,
    default() {
      return false;
    },
  })
  private readonly isRTL!: boolean;

  render() {
    const {
      mapData,
      map,
      padding,
      animationOptions,
      isRTL,
      $scopedSlots,
      dimensions,
    } = this;

    return (
      <Chart
        dimensions={dimensions}
        padding={padding}
        animationOptions={animationOptions}
        scopedSlots={$scopedSlots}
        isRTL={isRTL}
      >
        <Map
          map={map}
          dimensions={dimensions}
          mapData={mapData}
          padding={padding}
        />
      </Chart>
    );
  }
}
