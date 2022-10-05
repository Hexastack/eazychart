import React, { createContext, FC, useContext, useMemo } from 'react';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';
import {
  ScaleBandDefinition,
  ScaleLinearDefinition,
} from 'eazychart-core/src/types';
import { useChart } from '@/lib/use-chart';

export type ScaleLinearOrBand = ScaleLinear | ScaleBand;

type Class<T> = new (...args: any[]) => T;

type ScaleProp =
  | {
      ScaleClass: Class<ScaleLinear>;
      definition: ScaleLinearDefinition;
    }
  | {
      ScaleClass: Class<ScaleBand>;
      definition: ScaleBandDefinition;
    };

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
  xScaleConfig: ScaleProp;
  yScaleConfig: ScaleProp;
};

export const CartesianScale: FC<CartesianScaleProps> = ({
  xScaleConfig,
  yScaleConfig,
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
      {children}
    </CartesianScaleContext.Provider>
  );
};
