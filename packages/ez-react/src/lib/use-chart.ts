import { createContext, useContext } from 'react';
import { defaultChartContext } from 'eazychart-core/src';

export const ChartContext = createContext(defaultChartContext);

export const useChart = () => {
  return useContext(ChartContext);
};
