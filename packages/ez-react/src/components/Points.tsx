import React, { FC, SVGAttributes, useMemo } from 'react';
import { Point } from '@/components/shapes/Point';
import { useChart } from '@/lib/use-chart';
import {
  ScaleBand,
  ScaleLinear,
  defaultPointRadius,
  scalePointData,
} from '@ez/core/src';
import { Dimensions, PointDatum } from '@ez/core/src/types';

export interface PointsProps extends SVGAttributes<SVGGElement> {
  xScale: ScaleLinear | ScaleBand;
  yScale: ScaleLinear | ScaleBand;
  r?: number;
  scopedSlots?: {
    default: ({
      scaledData,
      dimensions,
    }: {
      scaledData: PointDatum[];
      dimensions: Dimensions;
    }) => React.ReactChild;
  };
}

export const Points: FC<PointsProps> = ({
  xScale,
  yScale,
  r = defaultPointRadius,
  scopedSlots,
  ...rest
}) => {
  const { activeData, dimensions, isRTL } = useChart();

  const scaledData = useMemo(() => {
    if (!xScale || !yScale) {
      return [];
    }
    return scalePointData(activeData, xScale, yScale, dimensions, isRTL);
  }, [xScale, yScale, activeData, dimensions, isRTL]);

  if (scopedSlots && scopedSlots.default) {
    return (
      <g className="ez-points">
        {scopedSlots.default({ scaledData, dimensions })}
      </g>
    );
  }

  return (
    <g className="ez-points" {...rest}>
      {scaledData.map((pointDatum) => {
        return <Point key={pointDatum.id} shapeDatum={pointDatum} r={r} />;
      })}
    </g>
  );
};
