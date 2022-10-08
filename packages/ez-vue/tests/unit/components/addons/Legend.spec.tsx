import Vue from 'vue';
import { render, fireEvent } from '@testing-library/vue';
import { colors, colorScale, rawData } from 'eazychart-core/src/sample-data';
import Legend from '@/components/addons/legend/Legend';

describe('Legend', () => {
  it('renders no filters for empty data', () => {
    const wrapper = render(Legend, {
      propsData: {
        onToggle: jest.fn(),
      },
      provide: {
        __reactiveInject__: {
          chart: {
            data: [],
            getScale: () => colorScale,
          },
        },
      },
    });
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('renders filters for data supplied', async () => {
    const wrapper = render(Legend, {
      propsData: {
        onToggle: jest.fn(),
      },
      provide: {
        __reactiveInject__: {
          chart: {
            data: rawData,
            getScale: () => colorScale,
          },
        },
      },
    });
    await Vue.nextTick();
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('calls toggleDatum on filter click', async () => {
    const onToggleDatum = jest.fn();
    const wrapper = render(Legend, {
      propsData: {
        onToggle: onToggleDatum,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            data: rawData,
            getScale: () => colorScale,
          },
        },
      },
    });
    const [firstLegend, secondLegend] = await wrapper.findAllByRole('button');
    await fireEvent.click(firstLegend);
    expect(onToggleDatum).toBeCalledWith(rawData[0].label, false, colors[0]);

    await fireEvent.click(firstLegend);
    expect(onToggleDatum).toBeCalledWith(rawData[0].label, true, colors[0]);

    await fireEvent.click(secondLegend);
    expect(onToggleDatum).toBeCalledWith(rawData[1].label, false, colors[1]);
  });
});
