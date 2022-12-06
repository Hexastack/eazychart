import * as d3Geo from 'd3-geo';
import { ChartPadding, GeoJsonFeature, ProjectionTypes } from './types';

export const mapProjection = (
  scale: number,
  width: number,
  height: number,
  padding: Partial<ChartPadding>,
  projectionType: keyof typeof d3Geo,
  feature: GeoJsonFeature
) => {
  if (!(projectionType in d3Geo)) {
    throw new Error('Uknown projection type provided!');
  }

  let projection = d3Geo[projectionType as ProjectionTypes]();
  projection = projection
    .scale(scale)
    .translate([
      width / 2 - (padding?.left || 0),
      height / 2 - (padding?.top || 0),
    ]);
  const pathGenerator = d3Geo.geoPath(projection);
  const dataPath = pathGenerator(feature);
  return dataPath;
};
