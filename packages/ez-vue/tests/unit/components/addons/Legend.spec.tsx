import { render, fireEvent } from '@testing-library/vue';
import { chartData } from '@ez/dev/jest/data';
import Legend from '@/components/addons/legend/Legend';

describe('Legend', () => {
  it('renders no filters for empty data', () => {
    const wrapper = render(Legend, {
      provide: {
        __reactiveInject__: {
          chart: {
            data: [],
          },
        },
      },
    });
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('renders filters for data supplied', () => {
    const wrapper = render(Legend, {
      provide: {
        __reactiveInject__: {
          chart: {
            data: chartData,
          },
        },
      },
    });
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('calls toggleDatum on filter click', async () => {
    const onToggleDatum = jest.fn();
    const wrapper = render(Legend, {
      provide: {
        __reactiveInject__: {
          chart: {
            data: chartData,
            toggleDatum: onToggleDatum,
          },
        },
      },
    });
    const [firstLegend, secondLegend] = await wrapper.findAllByRole('button');
    await fireEvent.click(firstLegend);
    expect(onToggleDatum).toBeCalledWith(chartData[0], false, 0);

    await fireEvent.click(secondLegend);
    expect(onToggleDatum).toBeCalledWith(chartData[1], true, 1);
  });
});
