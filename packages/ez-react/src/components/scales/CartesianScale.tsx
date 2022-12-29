import React, { createContext, FC, useContext, useMemo } from 'react';
import { ScaleLinear } from 'eazychart-core/src';
import { ScaleLinearOrBand, ScaleConfig } from 'eazychart-core/src/types';
import { useChart } from '@/lib/use-chart';
import { Fragment } from '@/lib/Fragment';

const CartesianScaleContext = createContext<{
  xScale: ScaleLinearOrBand;
  yScale: ScaleLinearOrBand;
}>({
  xScale: new ScaleLinear(),
  yScale: new ScaleLinear(),
});

export const useCartesianScales = () => {
  return useContext(CartesianScaleContext);
};

export type CartesianScaleProps = {
  xScaleConfig: ScaleConfig;
  yScaleConfig: ScaleConfig;
  children: React.ReactNode;
  isWrapped?: boolean;
};

export const CartesianScale: FC<CartesianScaleProps> = ({
  xScaleConfig,
  yScaleConfig,
  isWrapped = true,
  children,
}) => {
  const { data, dimensions } = useChart();

  const xScale = useMemo(() => {
    const { ScaleClass, definition } = xScaleConfig;
    const scale = new ScaleClass(definition);
    scale.computeScale(dimensions, data);
    return scale;
  }, [xScaleConfig, dimensions, data]);

  const yScale = useMemo(() => {
    const { ScaleClass, definition } = yScaleConfig;
    const scale = new ScaleClass(definition);
    scale.computeScale(dimensions, data);
    return scale;
  }, [yScaleConfig, dimensions, data]);

  return (
    <CartesianScaleContext.Provider value={{ xScale, yScale }}>
      {isWrapped ? (
        <Fragment type="g" name="cartesian-scale">
          {children}
        </Fragment>
      ) : (
        children
      )}
    </CartesianScaleContext.Provider>
  );
};
