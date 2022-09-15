import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { IrregularArcs } from '@/components/IrregularArcs';
import { Chart } from '@/components/Chart';
import {
  dimensions,
  scaleDefinitions,
  verticalLinearScale,
  chartData,
} from '@ez/dev/jest/data';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';

describe('IrregularArcs', () => {
  it('renders svg irregular arcs with the right coordinates / dimensions', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <Chart
          {...{
            ...baseChartProps,
            rawData: chartData.map((d) => ({ ...d, isActive: true })),
            scaleDefinitions,
            dimensions,
            scopedSlots: {
              LegendComponent: () => <>{null}</>,
              Tooltip: () => <>{null}</>,
            },
          }}
        >
          <IrregularArcs
            aScale={verticalLinearScale}
            rScale={verticalLinearScale}
            donutRadius={0}
          />
        </Chart>
      );
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });

    // 2nd render
    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
