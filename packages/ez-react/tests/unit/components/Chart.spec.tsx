import React from 'react';
import { render } from '@testing-library/react';
import {
  dimensions,
  padding,
  animationOptions,
  rawData,
} from 'eazychart-core/src/sample-data';
import { Chart } from '@/components/Chart';
import 'tests/mocks/ResizeObserver';
import { Tooltip } from '@/components/addons/tooltip/Tooltip';

describe('Chart', () => {
  it('renders svg chart container with the right slots', async () => {
    const wrapper = render(
      <Chart
        dimensions={dimensions}
        padding={padding}
        animationOptions={animationOptions}
        rawData={rawData}
        scopedSlots={{
          LegendComponent: () => <div>Legend Slot</div>,
          TooltipComponent: () => <div>Tooltip Slot</div>,
        }}
      >
        <div>Default Slot</div>
      </Chart>
    );

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('should provide the chart data to the children components', async () => {
    const wrapper = render(
      <Chart
        dimensions={dimensions}
        padding={padding}
        animationOptions={animationOptions}
        rawData={rawData}
        scopedSlots={{ TooltipComponent: Tooltip }}
      >
        <div>{JSON.stringify(rawData)}</div>
      </Chart>
    );

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
