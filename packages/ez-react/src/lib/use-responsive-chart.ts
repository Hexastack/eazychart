import { Dimensions } from 'eazychart-core/src/types';
import { createContext, useContext } from 'react';

export const ResponsiveChartContext = createContext<{
  dimensions?: Dimensions;
}>({
  dimensions: undefined,
});

export const useResponsiveChart = () => {
  return useContext(ResponsiveChartContext);
};
