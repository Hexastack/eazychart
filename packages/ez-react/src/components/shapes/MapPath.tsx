import React, { FC, MouseEventHandler, SVGAttributes, useMemo } from 'react';
import { GeoFeatureDatum } from 'eazychart-core/src/types';
import { defaultColor, getGeoPathByProjection } from 'eazychart-core/src';
import { useAnimation } from '@/lib/use-animation';
import { useChart } from '@/lib/use-chart';
import { useTooltip } from '../addons/tooltip/use-tooltip';
import { useMap } from '@/lib/use-map';

export interface MapPathProps extends SVGAttributes<SVGPathElement> {
  shapeDatum: GeoFeatureDatum;
}

export const MapPath: FC<MapPathProps> = ({
  shapeDatum,
  stroke = defaultColor,
  fill = defaultColor,
  strokeWidth = 1,
  ...rest
}) => {
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();
  const { animationOptions, onShapeClick } = useChart();
  const { projection } = useMap();
  const dataPath = useMemo(() => {
    const geoPathGenerator = getGeoPathByProjection(projection);
    return geoPathGenerator(shapeDatum.feature);
  }, [projection, shapeDatum.feature]);

  const currentData = useAnimation(dataPath || '', '', animationOptions) || '';

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

  if (!dataPath) return null;

  return (
    <path
      d={currentData}
      stroke={stroke || shapeDatum.color}
      strokeWidth={strokeWidth}
      fill={shapeDatum.color || fill}
      strokeLinejoin={'round'}
      strokeLinecap={'round'}
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...rest}
      className="ez-map-path"
    />
  );
};
