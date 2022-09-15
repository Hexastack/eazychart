import React, { FC, useMemo } from 'react';
import { PointDatum } from '@ez/core/src/types';
import { useChart } from '@/lib/use-chart';
import { PointsProps } from './Points';
import { Bubble } from './shapes/Bubble';
import { ScaleLinear, scaleBubbleData } from '@ez/core/src';

export interface BubblesProps extends PointsProps {
  rScale: ScaleLinear;
  fill?: string;
  scopedSlots?: {
    default: ({ scaledData }: { scaledData: PointDatum[] }) => React.ReactChild;
  };
}

export const Bubbles: FC<BubblesProps> = ({
  xScale,
  yScale,
  rScale,
  fill,
  scopedSlots,
  ...rest
}) => {
  const { activeData, dimensions, isRTL } = useChart();

  const scaledData = useMemo(() => {
    if (!xScale || !yScale || !rScale) {
      return [];
    }
    return scaleBubbleData(
      activeData,
      xScale,
      yScale,
      rScale,
      dimensions,
      isRTL
    );
  }, [xScale, yScale, rScale, activeData, dimensions, isRTL]);

  if (scopedSlots && scopedSlots.default) {
    return <g className="ez-bubbles">{scopedSlots.default({ scaledData })}</g>;
  }

  return (
    <g className="ez-bubbles" {...rest}>
      {scaledData.map((pointDatum) => {
        return (
          <Bubble shapeDatum={pointDatum} key={pointDatum.id} fill={fill} />
        );
      })}
    </g>
  );
};
