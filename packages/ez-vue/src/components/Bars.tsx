import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { ChartContext } from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { ScaleBand, ScaleLinear, scaleRectangleData } from 'eazychart-core/src';
import Bar from '@/components/shapes/Bar';

@Component({ components: { Bar } })
export default class Bars extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @Prop({
    type: Object as PropType<ScaleLinear | ScaleBand>,
    required: true,
  })
  private readonly xScale!: ScaleLinear | ScaleBand;

  @Prop({
    type: Object as PropType<ScaleLinear | ScaleBand>,
    required: true,
  })
  private readonly yScale!: ScaleLinear | ScaleBand;

  get scaledData() {
    if (!this.xScale || !this.yScale) {
      return [];
    }
    return scaleRectangleData(
      this.chart.activeData,
      this.xScale,
      this.yScale,
      this.chart.dimensions,
      this.chart.isRTL,
    );
  }

  render() {
    const { scaledData } = this;
    return (
      <g class="ez-bars">
        {scaledData.map((rectDatum) => (
          <Bar shapeDatum={rectDatum} key={rectDatum.id} />
        ))}
      </g>
    );
  }
}
