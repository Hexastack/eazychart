import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import {
  dimensions,
  scaleDefinitions,
  verticalLinearScale,
  chartData,
} from 'eazychart-core/src/sample-data';
import { IrregularArcs } from '@/components/IrregularArcs';
import { Chart } from '@/components/Chart';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { RadialScale } from '@/components/scales/RadialScale';

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
          <RadialScale rScale={verticalLinearScale}>
            <IrregularArcs domainKey={'value'} donutRadius={0} />
          </RadialScale>
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
