import React, { createContext, FC, useContext } from 'react';
import { useChart } from '@/lib/use-chart';
import { ScaleLinear } from 'eazychart-core/src';

export type LinearScaleProps = {
  linearScale: ScaleLinear;
};

const LinearScaleContext = createContext<LinearScaleProps>({
  linearScale: new ScaleLinear(),
});

export const useLinearScale = () => {
  return useContext(LinearScaleContext);
};

export const LinearScale: FC<LinearScaleProps> = ({
  linearScale,
  children,
}) => {
  const { activeData, dimensions } = useChart();

  linearScale.computeScale(dimensions, activeData);

  return (
    <LinearScaleContext.Provider value={{ linearScale }}>
      {children}
    </LinearScaleContext.Provider>
  );
};
