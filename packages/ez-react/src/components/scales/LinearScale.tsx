import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useChart } from '@/lib/use-chart';
import { ScaleLinear } from 'eazychart-core/src';
import { ScaleLinearDefinition } from 'eazychart-core/src/types';
import { Fragment } from '@/lib/Fragment';

const LinearScaleContext = createContext<{
  linearScale: ScaleLinear;
}>({
  linearScale: new ScaleLinear(),
});

export const useLinearScale = () => {
  return useContext(LinearScaleContext);
};

export const LinearScale: FC<
  ScaleLinearDefinition & { children: React.ReactNode; isWrapped?: boolean }
> = ({ children, isWrapped = true, ...definition }) => {
  const { data, dimensions } = useChart();

  const linearScale = useMemo<ScaleLinear>(() => {
    const scale = new ScaleLinear(definition);
    scale.computeScale(dimensions, data);
    return scale;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [definition]);

  useEffect(() => {
    linearScale.computeScale(dimensions, data);
  }, [dimensions, data, linearScale]);

  return (
    <LinearScaleContext.Provider value={{ linearScale }}>
      {isWrapped ? (
        <Fragment type="g" name="linear-scale">
          {children}
        </Fragment>
      ) : (
        children
      )}
    </LinearScaleContext.Provider>
  );
};
