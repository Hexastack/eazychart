import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  dimensions,
  verticalLinearScale,
  horizontalLinearScale,
  tooltip,
  rawData,
  radialLinearScale,
} from 'eazychart-core/src/sample-data';
import Bubbles from '@/components/Bubbles';

describe('Bubbles', () => {
  it('renders svg bubbles with the right coordinates / path', async () => {
    const wrapper = render(Bubbles, {
      propsData: {
        xDomainKey: horizontalLinearScale.definition.domainKey,
        yDomainKey: verticalLinearScale.definition.domainKey,
        rDomainKey: radialLinearScale.definition.domainKey,
        fill: 'blue',
      },
      provide: {
        __reactiveInject__: {
          chart: {
            data: rawData,
            dimensions,
            animationOptions: {
              easing: 'easeLinear',
              duration: 0,
              delay: 0,
            },
          },
          cartesianScale: {
            xScale: horizontalLinearScale,
            yScale: verticalLinearScale,
          },
          linearScale: radialLinearScale,
        },
        tooltip,
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
