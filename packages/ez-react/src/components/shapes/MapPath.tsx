import React, { FC, MouseEventHandler, SVGAttributes, useMemo } from 'react';
import { GeoFeatureDatum } from 'eazychart-core/src/types';
import { defaultColor } from 'eazychart-core/src';
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
  const { animationOptions } = useChart();
  const { geoPathGenerator } = useMap();
  const dataPath = useMemo(
    () => geoPathGenerator(shapeDatum.feature),
    [geoPathGenerator, shapeDatum.feature]
  );

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
      {...rest}
      className="ez-map-path"
    />
  );
};
