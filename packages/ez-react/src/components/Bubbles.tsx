import React, { FC, useMemo } from 'react';
import { scaleBubbleData } from 'eazychart-core/src';
import { PointDatum } from 'eazychart-core/src/types';
import { useChart } from '@/lib/use-chart';
import { PointsProps } from '@/components/Points';
import { Bubble } from '@/components/shapes/Bubble';
import { useCartesianScales } from './scales/CartesianScale';
import { useRadialScale } from './scales/RadialScale';

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
  const { activeData } = useChart();
  const { xScale, yScale } = useCartesianScales();
  const { rScale } = useRadialScale();

  const shapeData = useMemo(() => {
    if (!xScale || !yScale || !rScale) {
      return [];
    }
    return scaleBubbleData(
      activeData,
      xDomainKey,
      yDomainKey,
      rDomainKey,
      xScale,
      yScale,
      rScale
    );
  }, [activeData, xDomainKey, yDomainKey, rDomainKey, xScale, yScale, rScale]);

  if (scopedSlots && scopedSlots.default) {
    return <g className="ez-bubbles">{scopedSlots.default({ shapeData })}</g>;
  }

  return (
    <g className="ez-bubbles" {...rest}>
      {shapeData.map((shapeDatum) => {
        return (
          <Bubble shapeDatum={shapeDatum} key={shapeDatum.id} fill={fill} />
        );
      })}
    </g>
  );
};
