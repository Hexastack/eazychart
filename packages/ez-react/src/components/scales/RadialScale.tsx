import React, { createContext, FC, useContext } from 'react';
import { useChart } from '@/lib/use-chart';
import { ScaleLinear } from 'eazychart-core/src';

export type RadialScaleProps = {
  rScale: ScaleLinear;
};

const RadialScaleContext = createContext<RadialScaleProps>({
  rScale: new ScaleLinear(),
});

export const useRadialScale = () => {
  return useContext(RadialScaleContext);
};

export const RadialScale: FC<RadialScaleProps> = ({ rScale, children }) => {
  const { activeData, dimensions } = useChart();

  rScale.computeScale(dimensions, activeData);

  return (
    <RadialScaleContext.Provider value={{ rScale }}>
      {children}
    </RadialScaleContext.Provider>
  );
};
