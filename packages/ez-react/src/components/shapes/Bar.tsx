import React, { FC, MouseEventHandler, SVGAttributes } from 'react';
import { RectangleDatum } from 'eazychart-core/src/types';
import { defaultRectangleDatum } from 'eazychart-core/src';
import { useAnimation } from '@/lib/use-animation';
import { useTooltip } from '@/components/addons/tooltip/use-tooltip';
import { useChart } from '@/lib/use-chart';

export interface BarProps extends SVGAttributes<SVGRectElement> {
  shapeDatum?: RectangleDatum;
}

export const Bar: FC<BarProps> = ({
  shapeDatum = defaultRectangleDatum,
  ...rest
}) => {
  const { animationOptions } = useChart();
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();
  const currentShapeDatum = useAnimation(
    shapeDatum,
    defaultRectangleDatum,
    animationOptions
  );
  const { x, y, width, height, color } = currentShapeDatum;

  const handleMouseOver: MouseEventHandler<SVGRectElement> = (event) => {
    showTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleMouseMove: MouseEventHandler<SVGRectElement> = (event) => {
    moveTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleMouseLeave: MouseEventHandler<SVGRectElement> = (event) => {
    hideTooltip(shapeDatum, event as any as MouseEvent);
  };

  return (
    <rect
      fill={color}
      x={x}
      y={y}
      width={width}
      height={height}
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
      data-testid="ez-bar"
      className="ez-bar"
    />
  );
};
