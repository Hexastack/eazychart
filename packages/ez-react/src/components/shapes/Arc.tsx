import React, { FC, MouseEventHandler, SVGAttributes, useMemo } from 'react';
import { useChart } from '@/lib/use-chart';
import { useAnimation } from '@/lib/use-animation';
import { ArcDatum, ArcConfig } from 'eazychart-core/src/types';
import { generateArc } from 'eazychart-core/src';
import { useTooltip } from '../addons/tooltip/use-tooltip';

export interface ArcProps
  extends ArcConfig,
    Omit<SVGAttributes<SVGPathElement>, 'stroke' | 'strokeWidth'> {
  shapeDatum: ArcDatum;
  innerRadius: number;
  outerRadius: number;
}

export const Arc: FC<ArcProps> = ({
  shapeDatum,
  innerRadius,
  outerRadius,
  cornerRadius = 0,
  padAngle = 0,
  padRadius = 0,
  stroke,
  ...rest
}) => {
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();
  const { animationOptions, onShapeClick } = useChart();
  const currentShapeData = useAnimation(
    shapeDatum,
    {
      ...shapeDatum,
      color: '#FFF',
      startAngle: shapeDatum.startAngle,
      endAngle: shapeDatum.startAngle,
    },
    animationOptions
  );

  const path = useMemo(
    () =>
      generateArc(
        currentShapeData,
        outerRadius,
        innerRadius,
        cornerRadius,
        padAngle,
        padRadius
      ),
    [
      currentShapeData,
      outerRadius,
      innerRadius,
      cornerRadius,
      padAngle,
      padRadius,
    ]
  );

  const handleMouseOver: MouseEventHandler<SVGPathElement> = (event) => {
    showTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleMouseMove: MouseEventHandler<SVGPathElement> = (event) => {
    moveTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleMouseLeave: MouseEventHandler<SVGPathElement> = (event) => {
    hideTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleClick: MouseEventHandler<SVGPathElement> = (event) => {
    onShapeClick && onShapeClick(shapeDatum, event as any as MouseEvent);
  };

  return (
    <path
      key={shapeDatum.id}
      d={path || ''}
      fill={shapeDatum.color}
      stroke={stroke || shapeDatum.color}
      {...rest}
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-testid="ez-arc"
      className="ez-arc"
    />
  );
};
