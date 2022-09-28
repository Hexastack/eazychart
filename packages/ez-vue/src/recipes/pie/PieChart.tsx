import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  AnimationOptions,
  ChartPadding,
  Direction,
  RawData,
  PieConfig,
  Dimensions,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import { ScaleLinear } from 'eazychart-core/src';
import Chart from '@/components/Chart';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Pie from '@/components/Pie';

@Component({
  components: {
    Chart,
    Pie,
    Legend,
    Tooltip,
  },
})
export default class PieChart extends Vue {
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
  private readonly domainKey!: string;

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
    type: Function as PropType<
      (dimensions: Dimensions) => void
    >,
    required: false,
  })
  private readonly onResize?: (
    dimensions: Dimensions,
  ) => void;

  private scale!: ScaleLinear;

  created() {
    this.scale = new ScaleLinear({
      direction: Direction.HORIZONTAL,
      domainKey: this.domainKey,
    });
  }

  render() {
    const {
      scale,
      data,
      padding,
      colors,
      animationOptions,
      arc,
      onResize,
      $scopedSlots,
      dimensions,
    } = this;

    const scopedSlots = {
      Legend: $scopedSlots.Legend ? $scopedSlots.Legend : () => <Legend />,
      Tooltip: $scopedSlots.Tooltip,
    };

    return (
      <Chart
        dimensions={dimensions}
        rawData={data}
        scales={[scale]}
        padding={padding}
        colors={colors}
        animationOptions={animationOptions}
        scopedSlots={scopedSlots}
        onResize={onResize}
      >
        <Pie
          aScale={scale}
          donutRadius={arc.donutRadius}
          cornerRadius={arc.cornerRadius}
          padAngle={arc.padAngle}
          padRadius={arc.padRadius}
          stroke={arc.stroke}
          strokeWidth={arc.strokeWidth}
          sortValues={arc.sortValues}
        />
      </Chart>
    );
  }
}
