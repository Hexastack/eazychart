import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { dimensions, colors, rawData } from 'eazychart-core/src/sample-data';
import { Pie } from '@/components/Pie';
import { Chart } from '@/components/Chart';
import { baseChartProps, svgWrapper } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { ColorScale } from '@/components/scales/ColorScale';

describe('Pie', () => {
  it('renders svg pie with the right coordinates / dimensions', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <Chart {...baseChartProps} rawData={rawData} dimensions={dimensions}>
          <ColorScale domainKey={'label'} range={colors} isWrapped={false}>
            <svg>
              <Pie
                valueDomainKey={'amount'}
                labelDomainKey={'label'}
                donutRadius={0}
              />
            </svg>
          </ColorScale>
        </Chart>
      );
    });

    await waitFor(async () => {
      expect(await svgWrapper('ez-pie', wrapper)).toMatchSnapshot();
    });
  });
});
