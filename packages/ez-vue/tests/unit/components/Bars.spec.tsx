import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  dimensions,
  tooltip,
  horizontalBandScale,
  verticalLinearScale,
  rawData,
  horizontalBandScaleDef,
  verticalLinearScaleDef,
  colorScale,
} from 'eazychart-core/src/sample-data';
import Bars from '@/components/Bars';

describe('Bars', () => {
  it('renders svg rects with the right coordinates / dimensions', async () => {
    const wrapper = render(Bars, {
      propsData: {
        xDomainKey: horizontalBandScaleDef.domainKey,
        yDomainKey: verticalLinearScaleDef.domainKey,
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
            xScale: horizontalBandScale,
            yScale: verticalLinearScale,
          },
          colorScale,
        },
        tooltip,
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
