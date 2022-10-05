import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  AnimationOptions,
  ChartPadding,
  Direction,
  RawData,
  RadialConfig,
  Dimensions,
} from 'eazychart-core/src/types';
import { Prop } from 'vue-property-decorator';
import { ScaleLinear } from 'eazychart-core/src';
import Chart from '@/components/Chart';
import Legend from '@/components/addons/legend/Legend';
import Tooltip from '@/components/addons/tooltip/Tooltip';
import Arcs from '@/components/Arcs';

@Component({
  components: {
    Chart,
    Arcs,
    Legend,
    Tooltip,
  },
})
export default class RadialChart extends Vue {
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
    type: Object as PropType<RadialConfig>,
    default() {
      return {
        cornerRadius: 0,
        stroke: '#FFF',
        strokeWidth: 0,
        sortValues: null,
        spacing: 0,
      };
    },
  })
  private readonly arc!: RadialConfig;

  private scale!: ScaleLinear;

  created() {
    this.scale = new ScaleLinear({
      direction: Direction.HORIZONTAL,
      domainKey: this.domainKey,
      range: [0, 2 * Math.PI],
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
      >
        <Arcs
          arcScale={scale}
          cornerRadius={arc.cornerRadius}
          stroke={arc.stroke}
          strokeWidth={arc.strokeWidth}
          spacing={arc.spacing}
        />
      </Chart>
    );
  }
}
