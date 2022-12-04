import React, { FC, SVGAttributes } from 'react';
import { ChartPadding } from 'eazychart-core/src/types';
import { defaultColor } from 'eazychart-core/src';
import { useAnimation } from '@/lib/use-animation';
import { useChart } from '@/lib/use-chart';
import * as d3 from 'd3-geo';

export interface MapPathProps extends SVGAttributes<SVGPathElement> {
  padding?: Partial<ChartPadding>;
  feature?: any; //GeoJsonFeature;
  projection?: d3.GeoProjection; //PathProjection;
  projectionType: string;
  stroke: string;
  scale: number;
  width: number;
  height: number;
}

export const MapPath: FC<MapPathProps> = ({
  feature = [],
  stroke = defaultColor,
  fill = 'green',
  width = 800,
  height = 600,
  scale = 100,
  strokeWidth = 1,
  projectionType = '',
  padding,
  ...rest
}) => {
  const { animationOptions } = useChart();
  let projection = d3.geoMercator();
  switch (projectionType) {
    case 'geoMeractor':
      projection = d3.geoMercator();
      break;
    case 'geoOrthographic':
      projection = d3.geoOrthographic();
      break;
    case 'geoEqualEarth':
      projection = d3.geoEqualEarth();
      break;
    case 'geoEquirectangular':
      projection = d3.geoEquirectangular();
      break;
    case 'geoNaturalEarth1':
      projection = d3.geoNaturalEarth1();
      break;
    default:
      projection = d3.geoMercator();
  }
  projection = projection
    .scale(scale)
    .translate([
      width / 2 - (padding?.left || 0),
      height / 2 - (padding?.top || 0),
    ]);
  const pathGenerator = d3.geoPath(projection);
  const dataPath = pathGenerator(feature);
  const currentData =
    useAnimation(dataPath || '', '', animationOptions, [feature]) || '';

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
