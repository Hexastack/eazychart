import React, { createContext, FC, useContext } from 'react';
import { useChart } from '@/lib/use-chart';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';

type ScaleLinearOrBand = ScaleLinear | ScaleBand;

export type CartesianScaleContext = {
  xScale: ScaleLinearOrBand;
  yScale: ScaleLinearOrBand;
};

const cartesianScaleContext = createContext<CartesianScaleContext>({
  xScale: new ScaleLinear(),
  yScale: new ScaleLinear(),
});

export const useCartesianScales = () => {
  return useContext(cartesianScaleContext);
};

export type CartesianScaleProps = {
  xScale: ScaleLinearOrBand;
  yScale: ScaleLinearOrBand;
};

export const CartesianScale: FC<CartesianScaleProps> = ({
  xScale,
  yScale,
  children,
}) => {
  const { activeData, dimensions } = useChart();

  xScale.computeScale(dimensions, activeData);
  yScale.computeScale(dimensions, activeData);

  return (
    <cartesianScaleContext.Provider value={{ xScale, yScale }}>
      {children}
    </cartesianScaleContext.Provider>
  );
};
