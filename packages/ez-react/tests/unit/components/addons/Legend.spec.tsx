import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Legend } from '@/components/addons/legend/Legend';
import { chartData } from 'eazychart-core/src/sample-data';
import 'tests/mocks/ResizeObserver';

describe('Legend', () => {
  it('renders no filters for empty data', () => {
    const wrapper = render(<Legend data={[]} toggleDatum={jest.fn()} />);
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('renders filters for data supplied', async () => {
    const wrapper = render(<Legend data={chartData} toggleDatum={jest.fn()} />);

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('calls toggleDatum on filter click', async () => {
    const onToggleDatum = jest.fn();
    const wrapper = render(
      <Legend data={chartData} toggleDatum={onToggleDatum} />
    );

    const [firstLegend, secondLegend] = await wrapper.findAllByRole('button');
    fireEvent.click(firstLegend);
    expect(onToggleDatum).toBeCalledWith(chartData[0], false, 0);

    fireEvent.click(secondLegend);
    expect(onToggleDatum).toBeCalledWith(chartData[1], true, 1);
  });
});
