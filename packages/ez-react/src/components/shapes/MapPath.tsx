import React, { FC, SVGAttributes, useMemo } from 'react';
import {
  ChartPadding,
  GeoJsonFeature,
  Projection,
} from 'eazychart-core/src/types';
import { defaultColor, mapProjection } from 'eazychart-core/src';
import { useAnimation } from '@/lib/use-animation';
import { useChart } from '@/lib/use-chart';

export interface MapPathProps extends SVGAttributes<SVGPathElement> {
  padding?: Partial<ChartPadding>;
  feature?: GeoJsonFeature;
  projection?: Projection;
  projectionType: string;
  stroke: string;
  scale: number;
  width: number;
  height: number;
}

export const MapPath: FC<MapPathProps> = ({
  feature = {} as GeoJsonFeature,
  stroke = defaultColor,
  fill = 'green',
  width = 800,
  height = 600,
  scale = 100,
  strokeWidth = 1,
  projectionType = '',
  padding = {},
  ...rest
}) => {
  const { animationOptions } = useChart();
  let dataPath = useMemo(
    () => mapProjection(scale, width, height, padding, projectionType, feature),
    [scale, width, height, padding, projectionType, feature]
  );

  const currentData =
    useAnimation(dataPath || '', '', animationOptions, [
      scale,
      width,
      height,
      padding,
      projectionType,
      feature,
      dataPath,
    ]) || '';
  if (!dataPath) return null;
  return (
    <path
      d={currentData}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeLinejoin={'round'}
      strokeLinecap={'round'}
      {...rest}
      className="ez-map-path"
    />
  );
};
