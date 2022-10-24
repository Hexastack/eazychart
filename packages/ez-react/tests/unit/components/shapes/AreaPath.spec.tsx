import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { AreaPath } from '@/components/shapes/AreaPath';
import { Chart } from '@/components/Chart';
import { areaData } from 'eazychart-core/src/sample-data';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';

describe('AreaPath', () => {
  it('renders an svg path with the right coordinates / path', async () => {
    let wrapper: RenderResult;
    await act(async () => {
      wrapper = render(
        <Chart
          {...baseChartProps}
          scopedSlots={{
            LegendComponent: () => <>{null}</>,
            TooltipComponent: () => <>{null}</>,
          }}
        >
          <AreaPath shapeData={areaData} />
        </Chart>
      );
    });

    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
