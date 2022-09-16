import Vue from 'vue';
import { render, fireEvent } from '@testing-library/vue';
import { tooltip, pointA, dimensions } from 'eazychart-dev/jest/data';
import Point from '@/components/shapes/Point';

describe('Point', () => {
  it('renders an svg circle with the right coordinates', async () => {
    const wrapper = render(Point, {
      propsData: {
        shapeDatum: pointA,
      },
      provide: {
        __reactiveInject__: {
          chart: {},
        },
        tooltip,
        dimensions,
      },
    });

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('show/hide the tooltip on mouse over/out', async () => {
    const wrapper = render(Point, {
      propsData: {
        shapeDatum: pointA,
      },
      provide: {
        __reactiveInject__: {
          chart: {},
        },
        tooltip,
      },
    });

    await Vue.nextTick();
    const circleShape = await wrapper.findByTestId('ez-point');
    expect(tooltip.showTooltip).not.toHaveBeenCalled();
    expect(tooltip.hideTooltip).not.toHaveBeenCalled();
    // Shows tooltip on mouse over
    fireEvent.mouseOver(circleShape, { clientX: 100, clientY: 200 });
    expect(tooltip.showTooltip).toBeCalledWith(
      pointA,
      expect.anything(),
    );
    expect(tooltip.hideTooltip).not.toBeCalled();

    (tooltip.showTooltip as jest.Mock).mockReset();
    (tooltip.hideTooltip as jest.Mock).mockReset();

    // Hides tooltip on mouse leave
    fireEvent.mouseLeave(circleShape);
    expect(tooltip.showTooltip).not.toBeCalled();
    expect(tooltip.hideTooltip).toBeCalled();
  });
});
