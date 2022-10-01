import React, { createContext, FC, useContext } from 'react';
import { useChart } from '@/lib/use-chart';
import { ScaleLinear } from 'eazychart-core/src';

export type RadialScaleContext = {
  rScale: ScaleLinear;
};

const radialScaleContext = createContext<RadialScaleContext>({
  rScale: new ScaleLinear(),
});

export const useRadialScale = () => {
  return useContext(radialScaleContext);
};

export type RadialScaleProps = {
  rScale: ScaleLinear;
};

export const RadialScale: FC<RadialScaleProps> = ({ rScale, children }) => {
  const { activeData, dimensions } = useChart();

  rScale.computeScale(dimensions, activeData);

  return (
    <radialScaleContext.Provider value={{ rScale }}>
      {children}
    </radialScaleContext.Provider>
  );
};
