import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { Chart } from '@/components/Chart';
import {
  colors,
  dimensions,
  radialLinearScaleDef,
  rawData,
} from 'eazychart-core/src/sample-data';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { Arcs } from '@/components/Arcs';
import { LinearScale } from '@/components/scales/LinearScale';
import { ColorScale } from '@/components/scales/ColorScale';

describe('Arcs', () => {
  it('renders svg radial with the right coordinates / dimensions', async () => {
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
          <LinearScale {...radialLinearScaleDef} isWrapped={false}>
            <ColorScale domainKey={'label'} range={colors} isWrapped={false}>
              <Arcs valueDomainKey={'amount'} labelDomainKey={'label'} />
            </ColorScale>
          </LinearScale>
        </Chart>
      );
    });

    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
