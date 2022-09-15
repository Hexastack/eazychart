import Vue from 'vue';
import Component from 'vue-class-component';
import { ChartContext, NormalizedDatum } from '@ez/core/src/types';
import { InjectReactive } from 'vue-property-decorator';
import { computedLegendBoxStyle } from '@ez/core/src';

@Component
export default class Legend extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  handleLegendClick(d: NormalizedDatum, idx: number) {
    this.chart.toggleDatum(d, !d.isActive, idx);
  }

  render() {
    const { chart, handleLegendClick } = this;
    return (
      <div class="ez-legend">
        {chart.data.map((d, idx) => (
          <div
            class={{ 'ez-legend-key': true, 'ez-legend-disable': !d.isActive }}
            key={d.id}
            onClick={() => handleLegendClick(d, idx)}
            role="button"
          >
            <div class="ez-legend-box" style={computedLegendBoxStyle(d)}></div>
            <span class="ez-legend-text">{d.label}</span>
          </div>
        ))}
      </div>
    );
  }
}
