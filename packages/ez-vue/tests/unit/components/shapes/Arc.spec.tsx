import Vue from 'vue';
import { render, fireEvent } from '@testing-library/vue';
import { dimensions, arcDatum, tooltip } from 'eazychart-core/src/sample-data';
import Arc from '@/components/shapes/Arc';

describe('Arc', () => {
  it('renders an svg arc with the right coordinates / dimensions', async () => {
    const wrapper = render(Arc, {
      propsData: {
        shapeDatum: arcDatum,
        innerRadius: 10,
        outerRadius: 100,
      },
      provide: {
        __reactiveInject__: {
          chart: {},
        },
        tooltip,
      },
    });

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    const wrapper2 = render(Arc, {
      propsData: {
        shapeDatum: arcDatum,
        innerRadius: 10,
        outerRadius: 100,
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

    expect(wrapper2.container.innerHTML).toMatchSnapshot();
  });

  it('show/hide the tooltip on mouse over/out', async () => {
    const wrapper = render(Arc, {
      propsData: {
        shapeDatum: arcDatum,
        innerRadius: 10,
        outerRadius: 100,
      },
      provide: {
        __reactiveInject__: {
          chart: {},
        },
        tooltip,
        dimensions,
      },
    });

    await Vue.nextTick();
    const rectShape = await wrapper.findByTestId('ez-arc');
    expect(tooltip.showTooltip).not.toHaveBeenCalled();
    expect(tooltip.hideTooltip).not.toHaveBeenCalled();
    // Shows tooltip on mouse over
    fireEvent.mouseOver(rectShape);
    expect(tooltip.showTooltip).toBeCalledWith(arcDatum, expect.anything());
    expect(tooltip.hideTooltip).not.toBeCalled();

    (tooltip.showTooltip as jest.Mock).mockReset();
    (tooltip.hideTooltip as jest.Mock).mockReset();

    // Hides tooltip on mouse leave
    fireEvent.mouseLeave(rectShape);
    expect(tooltip.showTooltip).not.toBeCalled();
    expect(tooltip.hideTooltip).toBeCalled();
  });
});
