import { PropType } from 'vue';
import Component, { mixins } from 'vue-class-component';
import {
  AnimationOptions,
  ChartPadding,
  RawData,
  PieConfig,
  Dimensions,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import Chart from '@/components/Chart';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import IrregularArcs from '@/components/IrregularArcs';
import ToggleDatumMixin from '@/lib/ToggleDatumMixin';
import LinearScale from '@/components/scales/LinearScale';
import ColorScale from '@/components/scales/ColorScale';

@Component({
  components: {
    Chart,
    IrregularArcs,
    LinearScale,
    ColorScale,
    Legend,
    Tooltip,
  },
})
export default class IrregularPieChart extends mixins(ToggleDatumMixin) {
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
        scopedSlots={scopedSlots}
      >
        <LinearScale definition={{ domainKey: valueDomainKey }}>
          <ColorScale definition={{ domainKey: labelDomainKey, range: activeColors }}>
            <IrregularArcs
              props={{
                valueDomainKey,
                labelDomainKey,
                ...arc,
              }}
            />
          </ColorScale>
        </LinearScale>
      </Chart>
    );
  }
}
