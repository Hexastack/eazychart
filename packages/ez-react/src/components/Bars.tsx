import React, { FC, SVGAttributes, useMemo } from 'react';
import { scaleRectangleData } from 'eazychart-core/src';
import { Bar } from '@/components/shapes/Bar';
import { useChart } from '@/lib/use-chart';
import { useCartesianScales } from '@/components/scales/CartesianScale';
import { useColorScale } from './scales/ColorScale';
import { Dimensions, ScaleLinearOrBand } from 'eazychart-core/src/types';
import { RectangleDatum } from 'eazychart-core/dist/types';

export interface BarsProps extends SVGAttributes<SVGGElement> {
  xDomainKey: string;
  yDomainKey: string;
  scopedSlots?: {
    default: ({
      shapeData,
      scales,
      dimensions,
    }: {
      shapeData: RectangleDatum[];
      scales: {
        xScale: ScaleLinearOrBand;
        yScale: ScaleLinearOrBand;
      };
      dimensions: Dimensions;
    }) => React.ReactChild;
  };
}

export const Bars: FC<BarsProps> = ({
  xDomainKey,
  yDomainKey,
  scopedSlots,
  ...rest
}) => {
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

  return scopedSlots && scopedSlots.default ? (
    <g className="ez-stacked-bars" {...rest}>
      {scopedSlots.default({
        shapeData: scaledData,
        scales: { xScale, yScale },
        dimensions,
      })}
    </g>
  ) : (
    <g className="ez-bars" {...rest}>
      {scaledData.map((rectDatum) => {
        return <Bar key={rectDatum.id} shapeDatum={rectDatum} />;
      })}
    </g>
  );
};
