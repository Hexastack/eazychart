import Vue from 'vue';
import { render } from '@testing-library/vue';
import { chartData, tooltip } from 'eazychart-core/src/sample-data';
import { ShapeDatum } from 'eazychart-core/src/types';
import Tooltip from '@/components/addons/tooltip/Tooltip';

describe('Tooltip', () => {
  it('renders no tooltip when shape is being hovered', async () => {
    const wrapper = render(Tooltip, {
      propsData: {
        datum: null,
        shapeDatum: null,
        mousePosition: { x: 400, y: 300 },
        isVisible: false,
        animationOptions: {
          ease: 'easeLinear',
          delay: 0,
          duration: 0,
        },
      },
      provide: {
        tooltip,
      },
    });
    await Vue.nextTick();
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('renders the tooltip when a shape is hovered', async () => {
    const wrapper = render(Tooltip, {
      propsData: {
        offset: {
          x: -10,
          y: 20,
        },
        datum: chartData[0],
        shapeDatum: {
          color: chartData[0].color,
        } as ShapeDatum,
        mousePosition: { x: 50, y: 150 },
        isVisible: true,
        animationOptions: {
          ease: 'easeLinear',
          delay: 0,
          duration: 0,
        },
      },
      provide: {
        tooltip,
      },
    });
    await Vue.nextTick();
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
