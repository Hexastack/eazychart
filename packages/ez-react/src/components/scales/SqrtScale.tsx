import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useChart } from '@/lib/use-chart';
import { ScaleSqrt } from 'eazychart-core/src';
import { ScaleSqrtDefinition } from 'eazychart-core/src/types';
import { Fragment } from '@/lib/Fragment';

const SqrtScaleContext = createContext<{
  sqrtScale: ScaleSqrt;
}>({
  sqrtScale: new ScaleSqrt(),
});

export const useSqrtScale = () => {
  return useContext(SqrtScaleContext);
};

export const SqrtScale: FC<
  ScaleSqrtDefinition & { children: React.ReactNode; isWrapped?: boolean }
> = ({ children, isWrapped = true, ...definition }) => {
  const { data, dimensions } = useChart();

  const sqrtScale = useMemo<ScaleSqrt>(() => {
    const scale = new ScaleSqrt(definition);
    scale.computeScale(dimensions, data);
    return scale;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [definition]);

  useEffect(() => {
    sqrtScale.computeScale(dimensions, data);
  }, [dimensions, data, sqrtScale]);

  return (
    <SqrtScaleContext.Provider value={{ sqrtScale }}>
      {isWrapped ? (
        <Fragment type="g" name="sqrt-scale">
          {children}
        </Fragment>
      ) : (
        children
      )}
    </SqrtScaleContext.Provider>
  );
};
