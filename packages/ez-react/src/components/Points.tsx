import React, { FC, SVGAttributes, useMemo } from 'react';
import { defaultPointRadius, scalePointData } from 'eazychart-core/src';
import { Dimensions, PointDatum } from 'eazychart-core/src/types';
import { Point } from '@/components/shapes/Point';
import { useChart } from '@/lib/use-chart';
import {
  ScaleLinearOrBand,
  useCartesianScales,
} from '@/components/scales/CartesianScale';

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
  scopedSlots,
  ...rest
}) => {
  const { activeData, dimensions } = useChart();
  const { xScale, yScale } = useCartesianScales();

  const shapeData = useMemo(() => {
    if (!xScale || !yScale) {
      return [];
    }
    return scalePointData(activeData, xDomainKey, yDomainKey, xScale, yScale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeData, xDomainKey, yDomainKey, xScale.scale, yScale.scale]);

  if (scopedSlots && scopedSlots.default) {
    return (
      <g className="ez-points">
        {scopedSlots.default({
          shapeData,
          scales: { xScale, yScale },
          dimensions,
        })}
      </g>
    );
  }

  return (
    <g className="ez-points" {...rest}>
      {shapeData.map((shapeDatum) => {
        return <Point key={shapeDatum.id} shapeDatum={shapeDatum} r={r} />;
      })}
    </g>
  );
};
