import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  colorScale,
  dimensions,
  rawData,
  tooltip,
  verticalLinearScale,
} from 'eazychart-core/src/sample-data';
import IrregularArcs from '@/components/IrregularArcs';
import svgWrapper from '../../common';

describe('IrregularArcs', () => {
  it('renders svg irregular arcs with the right coordinates / dimensions', async () => {
    const wrapper = render(IrregularArcs, {
      propsData: {
        valueDomainKey: verticalLinearScale.definition.domainKey,
        labelDomainKey: colorScale.definition.domainKey,
        donutRadius: 0,
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
          linearScale: verticalLinearScale,
          colorScale,
        },
        tooltip,
      },
    });
    await Vue.nextTick();

    expect(await svgWrapper('ez-irregular-arcs', wrapper)).toMatchSnapshot();
  });
});
