import React from 'react';
import { render } from '@testing-library/react';
import { Chart } from '@/components/Chart';
import {
  dimensions,
  padding,
  animationOptions,
  rawData,
  colors,
  chartData,
  verticalLinearScale,
  horizontalBandScale,
  horizontalLinearScale,
} from '@ez/dev/jest/data';
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
        colors={colors}
        scales={[
          verticalLinearScale,
          horizontalBandScale,
          horizontalLinearScale,
        ]}
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
        colors={colors}
        scales={[
          verticalLinearScale,
          horizontalBandScale,
          horizontalLinearScale,
        ]}
        scopedSlots={{ TooltipComponent: Tooltip }}
      >
        <div>{JSON.stringify(chartData)}</div>
      </Chart>
    );

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
