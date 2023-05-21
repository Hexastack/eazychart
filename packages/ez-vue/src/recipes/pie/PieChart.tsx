import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import {
  AnimationOptions,
  ChartPadding,
  RawData,
  PieConfig,
  Dimensions,
  ShapeClickEventHandler,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import Chart from '@/components/Chart';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Pie from '@/components/Pie';
import ToggleDatumMixin from '@/lib/ToggleDatumMixin';
import ColorScale from '@/components/scales/ColorScale';

@Component({
  components: {
    Chart,
    Pie,
    ColorScale,
    Legend,
    Tooltip,
  },
})
export default class PieChart extends mixins(ToggleDatumMixin) {
  @Prop({
    type: Array as PropType<RawData>,
    required: true,
  })
  private readonly data!: RawData;

  @Prop({
    type: Object as PropType<Dimensions>,
    default() {
      return {};
    },
  })
  private readonly dimensions!: Partial<Dimensions>;

  @Prop({
    type: Array,
    default() {
      return ['#339999', '#993399', '#333399'];
    },
  })
  private readonly colors!: string[];

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
  private readonly padding!: ChartPadding;

  @Prop({
    type: String,
    default: 'value',
  })
  private readonly valueDomainKey!: string;

  @Prop({
    type: String,
    default: 'name',
  })
  private readonly labelDomainKey!: string;

  @Prop({
    type: Object as PropType<PieConfig>,
    default() {
      return {
        donutRadius: 0,
        cornerRadius: 0,
        padAngle: 0,
        padRadius: 0,
        stroke: '#FFF',
        strokeWidth: 0,
        sortValues: null,
      };
    },
  })
  private readonly arc!: PieConfig;

  @Prop({
    type: Function as PropType<ShapeClickEventHandler>,
    default() {
      return () => {};
    },
  })
  private readonly onShapeClick!: ShapeClickEventHandler;

  getData(): RawData {
    return this.data;
  }

  getColors(): string[] {
    return this.colors;
  }

  getDomainKey(): string {
    return this.labelDomainKey;
  }

  render() {
    const {
      valueDomainKey,
      labelDomainKey,
      padding,
      animationOptions,
      arc,
      $scopedSlots,
      dimensions,
      activeData,
      activeColors,
      toggleDatum,
      onShapeClick,
    } = this;

    const scopedSlots = {
      Legend: $scopedSlots.Legend
        ? $scopedSlots.Legend
        : () => <Legend props={{ onToggle: toggleDatum }} />,
      Tooltip: $scopedSlots.Tooltip,
    };

    return (
      <Chart
        dimensions={dimensions}
        rawData={activeData}
        padding={padding}
        animationOptions={animationOptions}
        onShapeClick={onShapeClick}
        scopedSlots={scopedSlots}
      >
        <ColorScale
          definition={{ domainKey: labelDomainKey, range: activeColors }}
        >
          <Pie
            props={{
              valueDomainKey,
              labelDomainKey,
              ...arc,
            }}
          />
        </ColorScale>
      </Chart>
    );
  }
}
