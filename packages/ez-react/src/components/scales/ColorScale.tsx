import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useChart } from '@/lib/use-chart';
import { ScaleOrdinal, ScaleQuantile } from 'eazychart-core/src';
import {
  ScaleOrdinalDefinition,
  ScaleQuantileDefinition,
} from 'eazychart-core/src/types';
import { Fragment } from '@/lib/Fragment';

const ColorScaleContext = createContext<{
  colorScale: ScaleOrdinal | ScaleQuantile;
}>({
  colorScale: new ScaleOrdinal(),
});

export const useColorScale = () => {
  return useContext(ColorScaleContext);
};

type ColorScaleOrdinalProps = ScaleOrdinalDefinition & {
  type?: 'ordinal';
  children: React.ReactNode;
  isWrapped?: boolean;
};

type ColorScaleQuantileProps = ScaleQuantileDefinition & {
  type?: 'quantile';
  children?: React.ReactNode;
  isWrapped?: boolean;
};

type ColorScaleProps = ColorScaleOrdinalProps | ColorScaleQuantileProps;

export const ColorScale: FC<ColorScaleProps> = ({
  children,
  isWrapped = true,
  type = 'ordinal',
  ...rest
}) => {
  const definition = rest as ScaleOrdinalDefinition | ScaleQuantileDefinition;
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

  const colorScale = useMemo<ScaleOrdinal | ScaleQuantile>(() => {
    let scale: ScaleOrdinal | ScaleQuantile;

    if (type === 'quantile') {
      scale = new ScaleQuantile(definition as ScaleQuantileDefinition);
    } else {
      scale = new ScaleOrdinal(definition as ScaleOrdinalDefinition);
    }
    scale.computeScale(dimensions, data);

    return scale;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, definition]);

  useEffect(() => {
    colorScale.computeScale(dimensions, data);
  }, [dimensions, data, colorScale, type]);

  useEffect(() => {
    // Register the color scale in the chart context.
    // This is useful for the legend for example.
    registerScale('colorScale', colorScale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ColorScaleContext.Provider value={{ colorScale }}>
      {isWrapped ? (
        <Fragment type="g" name="color-scale">
          {children}
        </Fragment>
      ) : (
        children
      )}
    </ColorScaleContext.Provider>
  );
};
