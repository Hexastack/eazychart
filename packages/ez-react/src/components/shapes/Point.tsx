import React, { FC, MouseEventHandler, SVGAttributes } from 'react';
import { PointDatum } from 'eazychart-core/src/types';
import { defaultPointDatum, defaultPointRadius } from 'eazychart-core/src';
import { useTooltip } from '@/components/addons/tooltip/use-tooltip';
import { useChart } from '@/lib/use-chart';

export interface PointProps extends SVGAttributes<SVGCircleElement> {
  shapeDatum?: PointDatum;
}

export const Point: FC<PointProps> = ({
  shapeDatum = defaultPointDatum,
  r = defaultPointRadius,
  fill,
  stroke,
  strokeWidth = 1,
  children,
  ...rest
}) => {
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();
  const {
    animationOptions: { duration },
  } = useChart();
  const { x, y, color } = shapeDatum;

  const handleMouseOver: MouseEventHandler<SVGCircleElement> = (event) => {
    showTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleMouseMove: MouseEventHandler<SVGCircleElement> = (event) => {
    moveTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleMouseLeave: MouseEventHandler<SVGCircleElement> = (event) => {
    hideTooltip(shapeDatum, event as any as MouseEvent);
  };

  return (
    <circle
      stroke={stroke || color}
      fill={fill || color}
      r={r}
      cx={x}
      cy={y}
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
      strokeWidth={strokeWidth}
      data-testid="ez-point"
      className="ez-point"
    >
      {children ? (
        children
      ) : (
        <animate attributeName="r" from={0} to={r} dur={`${duration}ms`} />
      )}
    </circle>
  );
};
