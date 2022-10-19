import React, { FC, SVGAttributes, useMemo } from 'react';
import { scaleRectangleData } from 'eazychart-core/src';
import { Bar } from '@/components/shapes/Bar';
import { useChart } from '@/lib/use-chart';
import { useCartesianScales } from '@/components/scales/CartesianScale';
import { useColorScale } from './scales/ColorScale';
import { RectangleDatum } from 'eazychart-core/src/types';

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
    return yDomainKeys.reduce((acc, yDomainKey, index) => {
      if (index === 0) {
        // @ts-ignore
        acc[yDomainKey] = scaleRectangleData(
          data,
          xDomainKey,
          yDomainKey,
          xScale,
          yScale,
          colorScale,
          dimensions,
          isRTL
        );
        return acc;
      } else {
        // @ts-ignore
        acc[yDomainKey] = scaleRectangleData(
          data,
          xDomainKey,
          yDomainKey,
          xScale,
          yScale,
          colorScale,
          dimensions,
          isRTL
        ).map((datum, id) => {
          // @ts-ignore
          const height0 = acc[yDomainKeys[index - 1]][id].height;
          return datum.height > height0
            ? { ...datum, height: datum.height - height0 }
            : datum;
        });
        return acc;
      }
    }, {});
  }, [
    data,
    yDomainKeys,
    xDomainKey,
    xScale,
    yScale,
    colorScale,
    dimensions,
    isRTL,
  ]);

  return (
    <g {...rest}>
      {yDomainKeys.map((yDomainKey) => {
        // @ts-ignore
        const shapeData = scaledData[yDomainKey] as RectangleDatum[];
        const color = colorScale.scale(yDomainKey);
        return shapeData.map((shapeDatum: RectangleDatum, index: number) => {
          return (
            <Bar
              key={`${yDomainKey}${index}`}
              shapeDatum={{ ...shapeDatum, color }}
            />
          );
        });
      })}
    </g>
  );
};
