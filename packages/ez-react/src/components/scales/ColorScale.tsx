import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useChart } from '@/lib/use-chart';
import { ScaleOrdinal } from 'eazychart-core/src';

const ColorScaleContext = createContext<{
  colorScale: ScaleOrdinal;
}>({
  colorScale: new ScaleOrdinal(),
});

export const useColorScale = () => {
  return useContext(ColorScaleContext);
};

export type ColorScaleProps = {
  domainKey?: string;
  domain?: string[];
  colors: string[];
};

export const ColorScale: FC<ColorScaleProps> = ({
  domainKey,
  domain,
  colors,
  children,
}) => {
  const { data, dimensions } = useChart();

  if (!domainKey && !domain) {
    throw new Error(
      'Either domainKey or domain prop needs to be supplied to the color scale'
    );
  }

  const colorDomain = useMemo(
    () =>
      domainKey ? data.map((datum) => datum[domainKey] as string) : domain,
    [data, domain, domainKey]
  );

  const colorScale = useMemo<ScaleOrdinal>(() => {
    const scale = new ScaleOrdinal({
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
