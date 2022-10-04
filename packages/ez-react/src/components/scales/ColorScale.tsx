import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useChart } from '@/lib/use-chart';
import { ScaleOrdinal } from 'eazychart-core/src';
import { ScaleOrdinalDefinition } from 'eazychart-core/src/types';

const ColorScaleContext = createContext<{
  colorScale: ScaleOrdinal;
}>({
  colorScale: new ScaleOrdinal(),
});

export const useColorScale = () => {
  return useContext(ColorScaleContext);
};

export const ColorScale: FC<ScaleOrdinalDefinition> = ({
  children,
  ...definition
}) => {
  const { data, dimensions, registerScale } = useChart();

  if (!definition.domainKey && !definition.domain) {
    throw new Error(
      'Either domainKey or domain prop needs to be supplied to the color scale'
    );
  }

  const domain = useMemo(() => {
    const { domainKey, domain } = definition;
    return domainKey ? data.map((datum) => datum[domainKey] as string) : domain;
  }, [data, definition]);

  const colorScale = useMemo<ScaleOrdinal>(() => {
    const scale = new ScaleOrdinal(definition);
    scale.computeScale(dimensions, data);
    return scale;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, definition]);

  useEffect(() => {
    colorScale.computeScale(dimensions, data);
  }, [dimensions, data, colorScale]);

  useEffect(() => {
    // Register the color scale in the chart context.
    // This is useful for the legend for example.
    registerScale('colorScale', colorScale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ColorScaleContext.Provider value={{ colorScale }}>
      {children}
    </ColorScaleContext.Provider>
  );
};
