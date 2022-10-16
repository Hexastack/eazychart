import React, { FC, useMemo } from 'react';
import { scaleBubbleData } from 'eazychart-core/src';
import { PointDatum } from 'eazychart-core/src/types';
import { useChart } from '@/lib/use-chart';
import { PointsProps } from '@/components/Points';
import { Bubble } from '@/components/shapes/Bubble';
import { useCartesianScales } from './scales/CartesianScale';
import { useLinearScale } from './scales/LinearScale';

export interface BubblesProps extends PointsProps {
  rDomainKey: string;
  fill?: string;
  scopedSlots?: {
    default: ({ shapeData }: { shapeData: PointDatum[] }) => React.ReactChild;
  };
}

export const Bubbles: FC<BubblesProps> = ({
  xDomainKey,
  yDomainKey,
  rDomainKey,
  fill,
  scopedSlots,
  ...rest
}) => {
  const { data } = useChart();
  const { xScale, yScale } = useCartesianScales();
  const { linearScale: rScale } = useLinearScale();

  const shapeData = useMemo(() => {
    return scaleBubbleData(
      data,
      xDomainKey,
      yDomainKey,
      rDomainKey,
      xScale,
      yScale,
      rScale
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    xDomainKey,
    yDomainKey,
    rDomainKey,
    xScale.scale,
    yScale.scale,
    rScale,
  ]);

  if (scopedSlots && scopedSlots.default) {
    return <g className="ez-bubbles">{scopedSlots.default({ shapeData })}</g>;
  }

  return (
    <g className="ez-bubbles" data-testid="ez-bubbles" {...rest}>
      {shapeData.map((shapeDatum) => {
        return (
          <Bubble shapeDatum={shapeDatum} key={shapeDatum.id} fill={fill} />
        );
      })}
    </g>
  );
};
