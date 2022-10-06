import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Legend } from '@/components/addons/legend/Legend';
import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import 'tests/mocks/ResizeObserver';
import { Chart } from '@/components/Chart';
import { baseChartProps } from 'tests/common';
import { ColorScale } from '@/components/scales/ColorScale';

describe('Legend', () => {
  it('renders no filters for empty data', () => {
    const wrapper = render(
      <Chart
        {...baseChartProps}
        rawData={[]}
        dimensions={dimensions}
        scopedSlots={{
          LegendComponent: () => <Legend onLegendClick={jest.fn()} />,
          TooltipComponent: () => <>{null}</>,
        }}
        isWrapped={false}
      >
        <ColorScale domainKey={'label'} range={colors}></ColorScale>
      </Chart>
    );
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('renders filters for data supplied', async () => {
    const wrapper = render(
      <Chart
        {...baseChartProps}
        rawData={rawData}
        dimensions={dimensions}
        scopedSlots={{
          LegendComponent: () => <Legend onLegendClick={jest.fn()} />,
          TooltipComponent: () => <>{null}</>,
        }}
        isWrapped={false}
      >
        <ColorScale domainKey={'label'} range={colors}></ColorScale>
      </Chart>
    );

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('calls toggleDatum on filter click', async () => {
    const onToggleDatum = jest.fn();
    const wrapper = render(
      <Chart
        {...baseChartProps}
        rawData={rawData}
        dimensions={dimensions}
        scopedSlots={{
          LegendComponent: () => <Legend onLegendClick={onToggleDatum} />,
          TooltipComponent: () => <>{null}</>,
        }}
        isWrapped={false}
      >
        <ColorScale domainKey={'label'} range={colors}></ColorScale>
      </Chart>
    );

    const [firstLegend, secondLegend] = await wrapper.findAllByRole('button');
    fireEvent.click(firstLegend);
    expect(onToggleDatum).toBeCalledWith(rawData[0].label, false, colors[0]);

    fireEvent.click(firstLegend);
    expect(onToggleDatum).toBeCalledWith(rawData[0].label, true, colors[0]);

    fireEvent.click(secondLegend);
    expect(onToggleDatum).toBeCalledWith(rawData[1].label, false, colors[1]);
  });
});
