import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useChart } from '@/lib/use-chart';
import { ScaleOrdinal } from 'eazychart-core/src';
import { Direction } from 'eazychart-core/src/types';

const ColorScaleContext = createContext<{
  colorScale: ScaleOrdinal;
}>({
  colorScale: new ScaleOrdinal(),
});

export const useColorScale = () => {
  return useContext(ColorScaleContext);
};

export type ColorScaleProps = {
  domainKey: string;
  colors: string[];
};

export const ColorScale: FC<ColorScaleProps> = ({
  domainKey,
  colors,
  children,
}) => {
  const { data, dimensions } = useChart();

  const colorDomain = useMemo(
    () => data.map((datum) => datum[domainKey] as string),
    [data, domainKey]
  );

  const colorScale = useMemo<ScaleOrdinal>(() => {
    const scale = new ScaleOrdinal({
      direction: Direction.VERTICAL,
      domain: colorDomain,
      range: colors,
    });
    scale.computeScale(dimensions, data);
    return scale;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorDomain, colors]);

  useEffect(() => {
    colorScale.computeScale(dimensions, data);
  }, [dimensions, data, colorScale]);

  return (
    <ColorScaleContext.Provider value={{ colorScale }}>
      {children}
    </ColorScaleContext.Provider>
  );
};
