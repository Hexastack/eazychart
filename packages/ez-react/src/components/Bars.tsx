import React, { FC, SVGAttributes, useMemo } from 'react';
import { Bar } from './shapes/Bar';
import { useChart } from '@/lib/use-chart';
import { ScaleBand, ScaleLinear, scaleRectangleData } from '@ez/core/src';

export interface BarsProps extends SVGAttributes<SVGGElement> {
  xScale: ScaleLinear | ScaleBand;
  yScale: ScaleLinear | ScaleBand;
}

export const Bars: FC<BarsProps> = ({ xScale, yScale, ...rest }) => {
  const { activeData, dimensions, isRTL } = useChart();

  const scaledData = useMemo(() => {
    if (!xScale || !yScale) {
      return [];
    }
    return scaleRectangleData(activeData, xScale, yScale, dimensions, isRTL);
  }, [activeData, xScale, yScale, dimensions, isRTL]);

  return (
    <g className="ez-bars" {...rest}>
      {scaledData.map((rectDatum) => {
        return <Bar key={rectDatum.id} shapeDatum={rectDatum} />;
      })}
    </g>
  );
};
