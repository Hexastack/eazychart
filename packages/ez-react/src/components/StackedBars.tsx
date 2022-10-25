import React, { FC, SVGAttributes, useMemo } from 'react';
import { scaleRectangleData } from 'eazychart-core/src';
import { Bar } from '@/components/shapes/Bar';
import { useChart } from '@/lib/use-chart';
import { useCartesianScales } from '@/components/scales/CartesianScale';
import { useColorScale } from './scales/ColorScale';
import { Direction, RectangleDatum } from 'eazychart-core/src/types';

export interface StackedBarsProps extends SVGAttributes<SVGGElement> {
  domainKey: string;
  stackDomainKeys: string[];
  direction: Direction.HORIZONTAL | Direction.VERTICAL;
}

export const StackedBars: FC<StackedBarsProps> = ({
  domainKey,
  stackDomainKeys,
  direction = Direction.VERTICAL,
  ...rest
}) => {
  const { data, dimensions, isRTL } = useChart();
  const { xScale, yScale } = useCartesianScales();
  const { colorScale } = useColorScale();

  const scaledDataDict = useMemo(() => {
    return stackDomainKeys.reduce(
      (acc: { [key: string]: RectangleDatum[] }, yDomainKey) => {
        acc[yDomainKey] = scaleRectangleData(
          data,
          domainKey,
          yDomainKey,
          xScale,
          yScale,
          colorScale,
          dimensions,
          isRTL
        );
        return acc;
      },
      {}
    );
  }, [
    data,
    stackDomainKeys,
    domainKey,
    xScale,
    yScale,
    colorScale,
    dimensions,
    isRTL,
  ]);

  return (
    <g className="ez-stacked-bars" {...rest}>
      {data.map((_datum, idx) => {
        return (
          // The Domain keys still needs to be sorted.
          // We create a bar for every data row
          // Each bar is a stack bar where every element is a domain key.
          <g className="ez-stacked-bar">
            {stackDomainKeys.map((yDomainKey, domainIdx) => {
              const color = colorScale.scale(yDomainKey);
              const scaledData = scaledDataDict[yDomainKey][idx];
              // The first domain key will not be affected.
              const previousRectWidth =
                domainIdx !== 0
                  ? scaledDataDict[stackDomainKeys[domainIdx - 1]][idx].width
                  : 0;
              const previousRectHeight =
                domainIdx !== 0
                  ? scaledDataDict[stackDomainKeys[domainIdx - 1]][idx].height
                  : 0;
              const shapeDatum =
                // The height or the width of the current bar will be computed depending to the orientaion
                // the height will be currentDKHeight - previousDKHeight (same for the width)
                {
                  ...scaledData,
                  width:
                    direction === Direction.HORIZONTAL
                      ? scaledData.width - previousRectWidth
                      : scaledData.width,
                  height:
                    direction === Direction.VERTICAL
                      ? scaledData.height - previousRectHeight
                      : scaledData.height,
                };

              return (
                <Bar
                  key={`${yDomainKey}${idx}`}
                  shapeDatum={{ ...shapeDatum, color }}
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
};
