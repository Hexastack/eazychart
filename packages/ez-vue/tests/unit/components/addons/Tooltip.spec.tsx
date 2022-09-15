import Vue from 'vue';
import { render } from '@testing-library/vue';
import { chartData, tooltip } from '@ez/dev/jest/data';
import { ShapeDatum } from '@ez/core/src/types';
import Tooltip from '@/components/addons/tooltip/Tooltip';

describe('Tooltip', () => {
  it('renders no tooltip when shape is being hovered', async () => {
    const wrapper = render(Tooltip, {
      propsData: {
        datum: null,
        shapeDatum: null,
        isVisible: false,
        domains: ['label', 'value'],
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
        domains: ['label', 'value'],
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
