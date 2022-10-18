import React, { FC, SVGAttributes, useMemo } from 'react';
import { scaleRectangleData } from 'eazychart-core/src';
import { Bar } from '@/components/shapes/Bar';
import { useChart } from '@/lib/use-chart';
import { useCartesianScales } from '@/components/scales/CartesianScale';
import { useColorScale } from './scales/ColorScale';

export interface StackedBarsProps extends SVGAttributes<SVGGElement> {
  xDomainKey: string;
  yDomainKeys: string[];
}

export const StackedBars: FC<StackedBarsProps> = ({
  xDomainKey,
  yDomainKeys,
  ...rest
}) => {
  const { data, dimensions, isRTL } = useChart();
  const { xScale, yScale } = useCartesianScales();
  const { colorScale } = useColorScale();

  const scaledData = useMemo(() => {
    return yDomainKeys.reduce((acc, yDomainKey) => {
      // @ts-ignore
      acc[yDomainKey] = scaleRectangleData(
        data,
        'id',
        yDomainKey,
        xScale,
        yScale,
        colorScale,
        dimensions,
        isRTL
      );
      return acc;
    }, {});
  }, [yDomainKeys, data, xScale, yScale, colorScale, dimensions, isRTL]);

  return (
    <g {...rest}>
      {data.forEach((_datum, index) => {
        return yDomainKeys.map((yDomainKey) => {
          return (
            <Bar
              key={`${yDomainKey}${index}`}
              shapeDatum={scaledData[yDomainKey as never][index]}
            />
          );
        });
      })}
    </g>
  );
};
