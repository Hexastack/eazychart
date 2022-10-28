import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { ChartContext } from 'eazychart-core/src/types';
import { InjectReactive, Prop, Watch } from 'vue-property-decorator';
import LegendItem from './LegendItem';

@Component
export default class Legend extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @Prop({
    type: Function as PropType<
      (key: string, isActive: boolean, color: string) => void
    >,
    required: false,
  })
  private readonly onToggle!: (
    key: string,
    isActive: boolean,
    color: string,
  ) => void;

  private keyDict: { [key: string]: string } = {};

  @Watch('colorScale')
  updateColorMap() {
    this.computeKeyColorMap();
  }

  mounted() {
    this.computeKeyColorMap();
  }

  computeKeyColorMap() {
    if (this.colorScale) {
      this.keyDict = this.colorScale.scale
        .domain()
        .reduce((map, domainKey) => ({
          ...map,
          [domainKey]: this.colorScale?.scale(domainKey),
        }), {});
    }
  }

  get colorScale() {
    return this.chart.getScale('colorScale');
  }

  render() {
    const { keyDict, onToggle } = this;
    return (
      <div class="ez-legend">
        {Object.entries(keyDict).map(([key, color]) => (
            <LegendItem
              key={key}
              onToggle={onToggle}
              label={key}
              color={color}
            />
        ))}
      </div>
    );
  }
}
