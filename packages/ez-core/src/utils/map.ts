import * as d3Geo from 'd3-geo';
import { Dimensions } from '../types';
import {
  GeoFeatureCollection,
  GeoProjectionViewport,
  GeoProjectionType,
  GeoProjection,
  GeoPathGenerator,
} from './types';

export const calculateGeoProjectionViewport = (
  geoJson: GeoFeatureCollection,
  projectionType: GeoProjectionType,
  { width, height }: Dimensions
): GeoProjectionViewport => {
  // Create a first guess for the projection
  const center = d3Geo.geoCentroid(geoJson);
  const initialOffset: [number, number] = [width / 2, height / 2];
  const projection = d3Geo[projectionType as GeoProjectionType]();

  projection.center(center).translate(initialOffset);

  // Create the path
  const path = d3Geo.geoPath(projection);

  // Using the path determine the bounds of the current map and use
  // these to determine better values for the scale and translation
  const bounds = path.bounds(geoJson);
  const hScale = (projection.scale() * width) / (bounds[1][0] - bounds[0][0]);
  const vScale = (projection.scale() * height) / (bounds[1][1] - bounds[0][1]);
  const scale = Math.min(hScale, vScale);
  const offset: [number, number] = [
    width - (bounds[0][0] + bounds[1][0]) / 2,
    height - (bounds[0][1] + bounds[1][1]) / 2,
  ];

  return {
    scale,
    center,
    offset,
  };
};

export const computeMapProjection = (
  projectionType: GeoProjectionType,
  { center, scale, offset }: GeoProjectionViewport
): { projection: GeoProjection; geoPathGenerator: GeoPathGenerator } => {
  if (!(projectionType in d3Geo)) {
    throw new Error('Uknown projection type provided!');
  }

  const projection = d3Geo[projectionType as GeoProjectionType]();

  projection.center(center);
  projection.scale(scale);
  projection.translate(offset);

  return {
    projection,
    geoPathGenerator: d3Geo.geoPath(projection),
  };
};
