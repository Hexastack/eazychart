import React, { FC, MouseEventHandler, SVGAttributes, useMemo } from 'react';
import {
  GeoJsonFeature,
  Projection,
  ProjectionType,
  ShapeDatum,
} from 'eazychart-core/src/types';
import { defaultColor, generateGeoFeaturePath } from 'eazychart-core/src';
import { useAnimation } from '@/lib/use-animation';
import { useChart } from '@/lib/use-chart';
import { useTooltip } from '../addons/tooltip/use-tooltip';

export interface MapPathProps extends SVGAttributes<SVGPathElement> {
  shapeDatum: ShapeDatum;
  feature?: GeoJsonFeature;
  projection?: Projection;
  projectionType?: ProjectionType;
  stroke: string;
  width: number;
  height: number;
}

export const MapPath: FC<MapPathProps> = ({
  shapeDatum,
  feature = {} as GeoJsonFeature,
  stroke = defaultColor,
  fill = 'green',
  width = 800,
  height = 600,
  scale = 100,
  strokeWidth = 1,
  projectionType = 'geoMercator',
  ...rest
}) => {
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();
  const { animationOptions } = useChart();
  const dataPath = useMemo(
    () => generateGeoFeaturePath(feature, projectionType),
    [feature, projectionType]
  );

  const currentData =
    useAnimation(dataPath || '', '', animationOptions, [
      scale,
      width,
      height,
      projectionType,
      feature,
      dataPath,
    ]) || '';

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
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
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
