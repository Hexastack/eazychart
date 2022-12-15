/* eslint-disable @typescript-eslint/no-explicit-any */
import Component from 'vue-class-component';
import Vue from 'vue';
import { unFlattenArgs, ArgsType } from 'eazychart-dev/storybook/utils';
// eslint-disable-next-line import/no-unresolved
import { Story } from '@storybook/vue/dist/ts3.9/client/index';

@Component
export class ChartWrapper extends Vue {
  render(h: Function) {
    return h('div', {}, this.$slots.default);
  }
}

@Component
export class ResizableChartWrapper extends Vue {
  render(h: Function) {
    return h(
      'div',
      {
        style: {
          width: '100%',
          height: '100vh',
          border: '2px solid #ccc',
          resize: 'auto',
          overflow: 'scroll',
        },
      },
      this.$slots.default,
    );
  }
}

// Wraps the stories and passes the unflattened args to them
export const buildTemplate = <T extends any>(
  storyFn: Story<T>,
): ((args: T, context: any) => string | Vue.Component) => (args: T, context: any) => {
    const compactedArgs = unFlattenArgs(args as ArgsType);
    return storyFn(compactedArgs, context);
  };
