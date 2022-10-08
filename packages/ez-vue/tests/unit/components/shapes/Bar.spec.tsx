import Vue from 'vue';
import { render, fireEvent } from '@testing-library/vue';
import { dimensions, rectData, tooltip } from 'eazychart-core/src/sample-data';
import Bar from '@/components/shapes/Bar';

describe('Bar', () => {
  it('renders an svg rect with the right coordinates / dimensions', async () => {
    const wrapper = render(Bar, {
      propsData: {
        shapeDatum: rectData,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            animationOptions: {
              easing: 'easeLinear',
              duration: 0,
              delay: 0,
            },
          },
        },
        tooltip,
        dimensions,
      },
    });

    await Vue.nextTick();
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('show/hide the tooltip on mouse over/out', async () => {
    const wrapper = render(Bar, {
      propsData: {
        shapeDatum: rectData,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            animationOptions: {
              easing: 'easeLinear',
              duration: 0,
              delay: 0,
            },
          },
        },
        tooltip,
      },
    });

    await Vue.nextTick();
    const rectShape = await wrapper.findByTestId('ez-bar');
    expect(tooltip.showTooltip).not.toHaveBeenCalled();
    expect(tooltip.hideTooltip).not.toHaveBeenCalled();
    // Shows tooltip on mouse over
    fireEvent.mouseOver(rectShape);
    expect(tooltip.showTooltip).toBeCalledWith(
      rectData,
      expect.anything(),
    );
    expect(tooltip.hideTooltip).not.toBeCalled();

    (tooltip.showTooltip as jest.Mock).mockReset();
    (tooltip.hideTooltip as jest.Mock).mockReset();

    // Hides tooltip on mouse leave
    fireEvent.mouseLeave(rectShape);
    expect(tooltip.showTooltip).not.toBeCalled();
    expect(tooltip.hideTooltip).toBeCalled();
  });
});
