import React from 'react';
import { act, RenderResult, waitFor } from '@testing-library/react';
import { LinePath } from '@/components/shapes/LinePath';
import { Chart } from '@/components/Chart';
import { pointsData } from 'eazychart-core/src/sample-data';
import { baseChartProps, renderSVG } from 'tests/common';
import 'tests/mocks/ResizeObserver';

describe('LinePath', () => {
  it('renders an svg path with the right coordinates / path', async () => {
    let wrapper: RenderResult;
    await act(async () => {
      wrapper = renderSVG(
        <Chart
          {...baseChartProps}
          scopedSlots={{
            LegendComponent: () => <>{null}</>,
            TooltipComponent: () => <>{null}</>,
          }}
        >
          <LinePath shapeData={pointsData} />
        </Chart>
      );
    });

    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
