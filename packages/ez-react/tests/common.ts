import { ChartProps } from '@/components/Chart';
import { RenderResult, RenderOptions, render } from '@testing-library/react';

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

export const renderSVG = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => {
  const container = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  return render(ui, { ...options, container });
};
