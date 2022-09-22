import React from 'react';
import {
  render,
  fireEvent,
  RenderResult,
  act,
  waitFor,
  createEvent,
} from '@testing-library/react';
import { Point } from '@/components/shapes/Point';
import { Chart } from '@/components/Chart';
import { pointA } from 'eazychart-core/src/sample-data';
import { baseChartProps } from 'tests/common';
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

describe('Point', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders an svg circle with the right coordinates', async () => {
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
          <Point shapeDatum={pointA} />
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
      <Chart {...baseChartProps}>
        <Point shapeDatum={pointA} />
      </Chart>
    );

    const circleShape = await wrapper.findByTestId('ez-point');
    expect(mockShowTooltip).not.toHaveBeenCalled();
    expect(mockHideTooltip).not.toHaveBeenCalled();

    // Shows tooltip on mouse over
    const event = createEvent.mouseOver(circleShape, {
      clientX: 100,
      clientY: 200,
    });
    fireEvent(circleShape, event);
    expect(mockShowTooltip).toBeCalledWith(pointA, expect.anything());
    expect(mockHideTooltip).not.toBeCalled();

    mockShowTooltip.mockReset();
    mockHideTooltip.mockReset();

    // Hides tooltip on mouse leave
    fireEvent.mouseLeave(circleShape);
    expect(mockShowTooltip).not.toBeCalled();
    expect(mockHideTooltip).toBeCalled();
  });
});
