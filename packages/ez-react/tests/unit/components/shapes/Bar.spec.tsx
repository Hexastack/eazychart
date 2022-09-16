import React from 'react';
import {
  createEvent,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { Bar } from '@/components/shapes/Bar';
import { Chart } from '@/components/Chart';
import { rectData } from 'eazychart-dev/jest/data';
import { baseChartProps } from 'tests/common';
import { act } from 'react-dom/test-utils';
import { TooltipContext } from 'eazychart-core/src/types';
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

describe('Bar', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders an svg rect with the right coordinates / dimensions', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <Chart
          {...{
            ...baseChartProps,
            scopedSlots: {
              LegendComponent: () => <>{null}</>,
              Tooltip: () => <>{null}</>,
            },
          }}
        >
          <Bar shapeDatum={rectData} />
        </Chart>
      );
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
    // 2nd render
    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });

  it('show/hide the tooltip on mouse over/out', async () => {
    const wrapper = render(
      <Chart
        {...{
          ...baseChartProps,
          scopedSlots: {
            LegendComponent: () => <>{null}</>,
            Tooltip: () => <>{null}</>,
          },
        }}
      >
        <Bar shapeDatum={rectData} />
      </Chart>
    );

    const rectShape = await wrapper.findByTestId('ez-bar');
    expect(mockShowTooltip).not.toHaveBeenCalled();
    expect(mockHideTooltip).not.toHaveBeenCalled();

    // Shows tooltip on mouse over
    const event = createEvent.mouseOver(rectShape, {
      clientX: 100,
      clientY: 200,
    });
    fireEvent(rectShape, event);
    expect(mockShowTooltip).toBeCalledWith(rectData, expect.anything());
    expect(mockHideTooltip).not.toBeCalled();

    mockShowTooltip.mockReset();
    mockHideTooltip.mockReset();

    // Hides tooltip on mouse leave
    fireEvent.mouseLeave(rectShape);
    expect(mockShowTooltip).not.toBeCalled();
    expect(mockHideTooltip).toBeCalled();
  });
});
