import * as d3 from 'd3-geo';
import { ChartPadding, GeoJsonFeature } from './types';

export const mapProjection = (
  scale: number,
  width: number,
  height: number,
  padding: Partial<ChartPadding>,
  projectionType: string,
  feature: GeoJsonFeature
) => {
  let projection: any = {
    geoMercator() {
      return d3.geoMercator();
    },
    geoTransverseMercator() {
      return d3.geoTransverseMercator();
    },
    geoOrthographic() {
      return d3.geoOrthographic();
    },
    geoEqualEarth() {
      return d3.geoEqualEarth();
    },
    geoEquirectangular() {
      return d3.geoEquirectangular();
    },
    geoNaturalEarth1() {
      return d3.geoNaturalEarth1();
    },
    geoAzimuthalEqualArea() {
      return d3.geoAzimuthalEqualArea();
    },
    geoGnomonic() {
      return d3.geoGnomonic();
    },
    geoStereographic() {
      return d3.geoStereographic();
    },
    geoConicConformal() {
      return d3.geoConicConformal();
    },
    geoConicEqualArea() {
      return d3.geoConicEqualArea();
    },
    geoConicEquidistant() {
      return d3.geoConicEquidistant();
    },
  };
  projection = projection[projectionType]();
  projection = projection
    .scale(scale)
    .translate([
      width / 2 - (padding?.left || 0),
      height / 2 - (padding?.top || 0),
    ]);
  const pathGenerator = d3.geoPath(projection);
  const dataPath = pathGenerator(feature);
  return dataPath;
};
