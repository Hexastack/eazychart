import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export class ChartWrapper extends Vue {
  render(h: Function) {
    return h('div', {}, this.$slots.default);
  }
}

@Component
export class ResizableChartWrapper extends Vue {
  render(h: Function) {
    return h('div', {
      style: {
        width: '100%',
        height: '100vh',
        border: '2px solid #ccc',
        resize: 'auto',
        overflow: 'scroll',
      }
    }, this.$slots.default);
  }
}

export const baseChartArgTypes = {
  isRTL: {
    control: { type: 'boolean' },
  },
};
