import React from 'react';
import {
  createEvent,
  fireEvent,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { Arc } from '@/components/shapes/Arc';
import { Chart } from '@/components/Chart';
import { arcDatum } from 'eazychart-core/src/sample-data';
import { baseChartProps, renderSVG } from 'tests/common';
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

describe('Arc', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders an svg arc with the right coordinates / dimensions', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = renderSVG(
        <Chart
          {...baseChartProps}
          scopedSlots={{
            LegendComponent: () => <>{null}</>,
            TooltipComponent: () => <>{null}</>,
          }}
        >
          <Arc shapeDatum={arcDatum} innerRadius={10} outerRadius={100} />
        </Chart>
      );
    });
    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });

  it('show/hide the tooltip on mouse over/out', async () => {
    const wrapper = renderSVG(
      <Chart
        {...baseChartProps}
        scopedSlots={{
          LegendComponent: () => <>{null}</>,
          TooltipComponent: () => <>{null}</>,
        }}
      >
        <Arc shapeDatum={arcDatum} innerRadius={10} outerRadius={100} />
      </Chart>
    );

    const pieArcShape = await wrapper.findByTestId('ez-arc');
    expect(mockShowTooltip).not.toHaveBeenCalled();
    expect(mockHideTooltip).not.toHaveBeenCalled();

    // Shows tooltip on mouse over
    const event = createEvent.mouseOver(pieArcShape, {
      clientX: 100,
      clientY: 200,
    });
    fireEvent(pieArcShape, event);
    expect(mockShowTooltip).toBeCalledWith(arcDatum, expect.anything());
    expect(mockHideTooltip).not.toBeCalled();

    mockShowTooltip.mockReset();
    mockHideTooltip.mockReset();

    // Hides tooltip on mouse leave
    fireEvent.mouseLeave(pieArcShape);
    expect(mockShowTooltip).not.toBeCalled();
    expect(mockHideTooltip).toBeCalled();
  });
});
