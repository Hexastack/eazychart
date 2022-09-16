import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { baseChartProps } from 'tests/common';
import { ShapeDatum, TooltipContext } from 'eazychart-core/src/types';
import { chartData } from 'eazychart-dev/jest/data';
import 'tests/mocks/ResizeObserver';

const mockShowTooltip = jest.fn();
const mockMoveTooltip = jest.fn();
const mockHideTooltip = jest.fn();

const mockTooltip: TooltipContext = {
  showTooltip: mockShowTooltip,
  moveTooltip: mockMoveTooltip,
  hideTooltip: mockHideTooltip,
};

jest.mock('@/components/addons/tooltip/use-tooltip', () => ({
  useTooltip: () => {
    return mockTooltip;
  },
}));

jest.mock('@/lib/use-animation', () => ({
  useAnimation: (targetData: any) => {
    return targetData;
  },
}));

describe('Tooltip', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders no tooltip when shape is being hovered', () => {
    const wrapper = render(
      <Chart
        {...{
          ...baseChartProps,
          scopedSlots: {
            LegendComponent: () => <>{null}</>,
            TooltipComponent: Tooltip,
          },
        }}
      />
    );
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('renders the tooltip when a shape is hovered', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <Chart
          {...{
            ...baseChartProps,
            scopedSlots: {
              LegendComponent: () => <>{null}</>,
              TooltipComponent: () => (
                <Tooltip
                  offset={{
                    x: -10,
                    y: 20,
                  }}
                  datum={chartData[0]}
                  shapeDatum={
                    {
                      color: chartData[0].color,
                    } as ShapeDatum
                  }
                  mousePosition={{ x: 50, y: 150 }}
                  isVisible={true}
                  domains={['label', 'value']}
                />
              ),
            },
          }}
        ></Chart>
      );
    });
    // 2nd render
    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
