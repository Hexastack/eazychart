import React, { FC, SVGAttributes, useMemo } from 'react';
import {
  defaultColor,
  defaultPointRadius,
  scalePointData,
} from 'eazychart-core/src';
import {
  Dimensions,
  PointDatum,
  ScaleLinearOrBand,
} from 'eazychart-core/src/types';
import { Point } from '@/components/shapes/Point';
import { useChart } from '@/lib/use-chart';
import { useCartesianScales } from '@/components/scales/CartesianScale';

export interface PointsProps extends SVGAttributes<SVGGElement> {
  xDomainKey: string;
  yDomainKey: string;
  r?: number;
  scopedSlots?: {
    default: ({
      shapeData,
      scales,
      dimensions,
    }: {
      shapeData: PointDatum[];
      scales: {
        xScale: ScaleLinearOrBand;
        yScale: ScaleLinearOrBand;
      };
      dimensions: Dimensions;
    }) => React.ReactChild;
  };
}

export const Points: FC<PointsProps> = ({
  xDomainKey,
  yDomainKey,
  r = defaultPointRadius,
  fill = defaultColor,
  stroke = defaultColor,
  scopedSlots,
  ...rest
}) => {
  const { data, dimensions } = useChart();
  const { xScale, yScale } = useCartesianScales();

  const shapeData = useMemo(() => {
    return scalePointData(data, xDomainKey, yDomainKey, xScale, yScale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, xDomainKey, yDomainKey, xScale.scale, yScale.scale]);

  if (scopedSlots && scopedSlots.default) {
    return (
      <g className="ez-points" data-testid="ez-points">
        {scopedSlots.default({
          shapeData,
          scales: { xScale, yScale },
          dimensions,
        })}
      </g>
    );
  }

  return (
    <g className="ez-points" data-testid="ez-points" {...rest}>
      {shapeData.map((shapeDatum) => {
        return (
          <Point
            key={shapeDatum.id}
            shapeDatum={shapeDatum}
            r={r}
            fill={fill}
            stroke={stroke}
          />
        );
      })}
    </g>
  );
};
