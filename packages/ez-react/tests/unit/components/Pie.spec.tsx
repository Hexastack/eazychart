import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { dimensions, colors, rawData } from 'eazychart-core/src/sample-data';
import { Pie } from '@/components/Pie';
import { Chart } from '@/components/Chart';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { ColorScale } from '@/components/scales/ColorScale';

describe('Pie', () => {
  it('renders svg pie with the right coordinates / dimensions', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <Chart
          {...baseChartProps}
          rawData={rawData}
          dimensions={dimensions}
          scopedSlots={{
            LegendComponent: () => <>{null}</>,
            TooltipComponent: () => <>{null}</>,
          }}
        >
          <ColorScale domainKey={'label'} range={colors} isWrapped={false}>
            <Pie
              valueDomainKey={'amount'}
              labelDomainKey={'label'}
              donutRadius={0}
            />
          </ColorScale>
        </Chart>
      );
    });

    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
