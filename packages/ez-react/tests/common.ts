import { ChartProps } from '@/components/Chart';
import { RenderResult } from '@testing-library/react';

export const baseChartProps: ChartProps = {
  rawData: [],
  animationOptions: {
    easing: 'easeLinear',
    duration: 0,
    delay: 0,
  },
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  scopedSlots: {},
  isWrapped: false,
};

export const svgWrapper = async (
  chartTestId: string,
  wrapper: RenderResult
) => {
  const elementFindedByTestId = await wrapper.findByTestId(chartTestId);
  const svgWrapper = document.createElement('svg');
  svgWrapper.appendChild(elementFindedByTestId);
  return svgWrapper;
};
