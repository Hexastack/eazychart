import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { LinePath } from '@/components/shapes/LinePath';
import { Chart } from '@/components/Chart';
import { pointsData } from 'eazychart-core/src/sample-data';
import { baseChartProps, svgWrapper } from 'tests/common';
import 'tests/mocks/ResizeObserver';

describe('LinePath', () => {
  it('renders an svg path with the right coordinates / path', async () => {
    let wrapper: RenderResult;
    await act(async () => {
      wrapper = render(
        <Chart {...baseChartProps}>
          <svg>
            <LinePath shapeData={pointsData} />
          </svg>
        </Chart>
      );
    });
    await waitFor(async () => {
      expect(await svgWrapper('ez-line', wrapper)).toMatchSnapshot();
    });
  });
});
