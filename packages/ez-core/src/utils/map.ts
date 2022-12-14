import * as d3Geo from 'd3-geo';
import { Dimensions, NormalizedData } from '../types';
import {
  GeoFeatureDataDict,
  GeoFeature,
  GeoFeatureCollection,
  GeoFeatures,
  GeoProjectionCenter,
  GeoProjectionType,
} from './types';

export const calculateGeoProjectionCenter = (
  geoJson: GeoFeatureCollection,
  projectionType: GeoProjectionType,
  { width, height }: Dimensions
) => {
  // Create a first guess for the projection
  const center = d3Geo.geoCentroid(geoJson);
  const initialOffset: [number, number] = [width / 2, height / 2];
  const projection = d3Geo[projectionType as GeoProjectionType]();

  projection
    .center(center)
    .translate(initialOffset);

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

export const getGeoFeatureCentroid = d3Geo.geoCentroid;

export const getGeoFeatureDataDict = (
  features: GeoFeatures,
  data: NormalizedData,
  geoDomainKey: string
) => {
  return features.map(feature => {
    const { properties } = feature;
    if (!properties || !(geoDomainKey in properties)) {
      console.warn(
        'Unable to find the geo domain key in the feature properties'
      );
      return { feature };
    }
    const datum = data.find(
      datum => datum[geoDomainKey] === properties[geoDomainKey]
    );
    return {
      feature,
      datum,
    };
  }, {} as GeoFeatureDataDict);
};

export const generateGeoFeaturePath = (
  feature: GeoFeature,
  projectionType: GeoProjectionType,
  { center, scale, offset }: GeoProjectionCenter
) => {
  if (!(projectionType in d3Geo)) {
    throw new Error('Uknown projection type provided!');
  }

  const projection = d3Geo[projectionType as GeoProjectionType]();

  projection.center(center);
  projection.scale(scale);
  projection.translate(offset);

  const pathGenerator = d3Geo.geoPath(projection);
  const dataPath = pathGenerator(feature);

  return dataPath;
};
