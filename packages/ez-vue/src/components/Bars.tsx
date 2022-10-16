import Vue from 'vue';
import Component from 'vue-class-component';
import { ChartContext, ScaleLinearOrBand } from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { ScaleOrdinal, scaleRectangleData } from 'eazychart-core/src';
import Bar from '@/components/shapes/Bar';

@Component({ components: { Bar } })
export default class Bars extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @InjectReactive('cartesianScale')
  private cartesianScale!: { xScale: ScaleLinearOrBand, yScale: ScaleLinearOrBand };

  @InjectReactive('colorScale')
  private colorScale!: ScaleOrdinal;

  @Prop({
    type: String,
    required: true,
  })
  private readonly xDomainKey!: string;

  @Prop({
    type: String,
    required: true,
  })
  private readonly yDomainKey!: string;

  get shapeData() {
    return scaleRectangleData(
      this.chart.data,
      this.xDomainKey,
      this.yDomainKey,
      this.cartesianScale.xScale,
      this.cartesianScale.yScale,
      this.colorScale,
      this.chart.dimensions,
      this.chart.isRTL,
    );
  }

  render() {
    const { shapeData } = this;
    return (
      <g class="ez-bars" data-testid="ez-bars">
        {shapeData.map((rectDatum) => (
          <Bar shapeDatum={rectDatum} key={rectDatum.id} />
        ))}
      </g>
    );
  }
}
