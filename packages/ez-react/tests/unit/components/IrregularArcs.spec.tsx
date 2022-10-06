import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import {
  dimensions,
  chartData,
  verticalLinearScaleDef,
  colors,
} from 'eazychart-core/src/sample-data';
import { IrregularArcs } from '@/components/IrregularArcs';
import { Chart } from '@/components/Chart';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { LinearScale } from '@/components/scales/LinearScale';
import { ColorScale } from '@/components/scales/ColorScale';

describe('IrregularArcs', () => {
  it('renders svg irregular arcs with the right coordinates / dimensions', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <Chart
          {...baseChartProps}
          rawData={chartData.map((d) => ({ ...d, isActive: true }))}
          dimensions={dimensions}
          scopedSlots={{
            LegendComponent: () => <>{null}</>,
            TooltipComponent: () => <>{null}</>,
          }}
        >
          <LinearScale domainKey={'value'} {...verticalLinearScaleDef}>
            <ColorScale domainKey={'label'} range={colors}>
              <IrregularArcs
                valueDomainKey={'value'}
                labelDomainKey={'label'}
                donutRadius={0}
              />
            </ColorScale>
          </LinearScale>
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
