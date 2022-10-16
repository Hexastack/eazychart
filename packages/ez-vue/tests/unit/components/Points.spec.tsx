import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  dimensions,
  verticalLinearScale,
  horizontalLinearScale,
  tooltip,
  rawData,
} from 'eazychart-core/src/sample-data';
import Points from '@/components/Points';
import svgWrapper from '../../common';

describe('Points', () => {
  it('renders svg points with the right coordinates / path', async () => {
    const wrapper = render(Points, {
      propsData: {
        xDomainKey: horizontalLinearScale.definition.domainKey,
        yDomainKey: verticalLinearScale.definition.domainKey,
        r: 6,
        fill: 'red',
        stroke: 'red',
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

    expect(await svgWrapper('ez-points', wrapper)).toMatchSnapshot();
  });
});
