import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  dimensions,
  verticalLinearScale,
  horizontalLinearScale,
  tooltip,
  rawData,
} from 'eazychart-core/src/sample-data';
import Area from '@/components/Area';

describe('Area', () => {
  it('renders svg area with the right coordinates / dimensions', async () => {
    const wrapper = render(Area, {
      propsData: {
        xDomainKey: horizontalLinearScale.definition.domainKey,
        yDomainKey: verticalLinearScale.definition.domainKey,
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
        },
        tooltip,
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
