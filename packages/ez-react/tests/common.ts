import { ChartProps } from '@/components/Chart';

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
