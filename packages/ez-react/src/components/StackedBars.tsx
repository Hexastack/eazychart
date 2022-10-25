import React, { FC, SVGAttributes, useMemo } from 'react';
import { scaleRectangleData } from 'eazychart-core/src';
import { Bar } from '@/components/shapes/Bar';
import { useChart } from '@/lib/use-chart';
import { useCartesianScales } from '@/components/scales/CartesianScale';
import { useColorScale } from './scales/ColorScale';
import { Direction, RectangleDatum } from 'eazychart-core/src/types';

export interface StackedBarsProps extends SVGAttributes<SVGGElement> {
  singleDomainKey: string;
  multiDomainKeys: string[];
  direction: Direction.HORIZONTAL | Direction.VERTICAL;
}

export const StackedBars: FC<StackedBarsProps> = ({
  singleDomainKey,
  multiDomainKeys,
  direction = Direction.VERTICAL,
  ...rest
}) => {
  const { data, dimensions, isRTL } = useChart();
  const { xScale, yScale } = useCartesianScales();
  const { colorScale } = useColorScale();

  const scaledDataDict = useMemo(() => {
    return multiDomainKeys.reduce(
      (acc: { [key: string]: RectangleDatum[] }, yDomainKey) => {
        acc[yDomainKey] = scaleRectangleData(
          data,
          singleDomainKey,
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
    multiDomainKeys,
    singleDomainKey,
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
            {multiDomainKeys.map((yDomainKey, domainIdx) => {
              const color = colorScale.scale(yDomainKey);
              const shapeDatum =
                // The height of the current bar will be computed
                // the height will be currentDKHeight - previousDKHeight
                // The first domain key will not be affected.
                domainIdx !== 0
                  ? {
                      ...scaledDataDict[yDomainKey][idx],
                      width:
                        direction === Direction.HORIZONTAL
                          ? scaledDataDict[yDomainKey][idx].width -
                            scaledDataDict[multiDomainKeys[domainIdx - 1]][idx]
                              .width
                          : scaledDataDict[yDomainKey][idx].width,
                      height:
                        direction === Direction.VERTICAL
                          ? scaledDataDict[yDomainKey][idx].height -
                            scaledDataDict[multiDomainKeys[domainIdx - 1]][idx]
                              .height
                          : scaledDataDict[yDomainKey][idx].height,
                    }
                  : scaledDataDict[yDomainKey][idx];
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
