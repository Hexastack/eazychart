import React, { createContext, FC, useContext } from 'react';
import { useChart } from '@/lib/use-chart';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';

type ScaleLinearOrBand = ScaleLinear | ScaleBand;

export type CartesianScaleProps = {
  xScale: ScaleLinearOrBand;
  yScale: ScaleLinearOrBand;
};

const CartesianScaleContext = createContext<CartesianScaleProps>({
  xScale: new ScaleLinear(),
  yScale: new ScaleLinear(),
});

export const useCartesianScales = () => {
  return useContext(CartesianScaleContext);
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
    <CartesianScaleContext.Provider value={{ xScale, yScale }}>
      {children}
    </CartesianScaleContext.Provider>
  );
};
