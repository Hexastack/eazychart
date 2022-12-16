import * as d3Geo from 'd3-geo';
import { GeoJsonFeature, ProjectionType } from './types';

export const generateGeoFeaturePath = (
  feature: GeoJsonFeature,
  projectionType: ProjectionType
) => {
  if (!(projectionType in d3Geo)) {
    throw new Error('Uknown projection type provided!');
  }

  const projection = d3Geo[projectionType as ProjectionType]();
  const pathGenerator = d3Geo.geoPath(projection);
  const dataPath = pathGenerator(feature);
  return dataPath;
};
