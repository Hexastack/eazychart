import React, { FC, SVGAttributes, useMemo } from 'react';
import { scaleRectangleData } from 'eazychart-core/src';
import { Bar } from '@/components/shapes/Bar';
import { useChart } from '@/lib/use-chart';
import { useCartesianScales } from '@/components/scales/CartesianScale';
import { useColorScale } from './scales/ColorScale';

export interface BarsProps extends SVGAttributes<SVGGElement> {
  xDomainKey: string;
  yDomainKey: string;
}

export const Bars: FC<BarsProps> = ({ xDomainKey, yDomainKey, ...rest }) => {
  const { data, dimensions, isRTL } = useChart();
  const { xScale, yScale } = useCartesianScales();
  const { colorScale } = useColorScale();

  const scaledData = useMemo(() => {
    return scaleRectangleData(
      data,
      xDomainKey,
      yDomainKey,
      xScale,
      yScale,
      colorScale,
      dimensions,
      isRTL
    );
  }, [
    data,
    xDomainKey,
    yDomainKey,
    xScale,
    yScale,
    colorScale,
    dimensions,
    isRTL,
  ]);

  return (
    <g className="ez-bars" {...rest}>
      {scaledData.map((rectDatum) => {
        return <Bar key={rectDatum.id} shapeDatum={rectDatum} />;
      })}
    </g>
  );
};
