import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  dimensions,
  padding,
  animationOptions,
  rawData,
  colors,
} from 'eazychart-dev/jest/data';
import { Component, InjectReactive } from 'vue-property-decorator';
import { ChartContext } from 'eazychart-core/src/types';
import Chart from '@/components/Chart';
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

@Component
export default class DataDump extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  render() {
    const { chart } = this;
    return <div>{JSON.stringify(chart.data)}</div>;
  }
}

describe('Chart', () => {
  it('renders svg chart container with the right slots', async () => {
    const wrapper = render(Chart, {
      propsData: {
        dimensions,
        padding,
        animationOptions,
        rawData,
        colors,
      },
      slots: {
        default: '<div>Default Slot</div>',
        Legend: '<div>Legend Slot</div>',
        Tooltip: '<div>Tooltip Slot</div>',
      },
    });

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('should provide the chart data to the children components', async () => {
    const wrapper = render(Chart, {
      propsData: {
        dimensions,
        padding,
        animationOptions,
        rawData,
        colors,
      },
      slots: {
        default: DataDump,
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
