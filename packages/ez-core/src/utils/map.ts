import { select } from 'd3-selection';
import * as d3 from 'd3-geo';

export const mapProjection = (
  scale: number,
  width: number,
  height: number,
  data: any
) => {
  let projection = d3
    .geoMercator()
    .scale(scale)
    .translate([width / 2, height / 2]);
  let path = d3.geoPath().projection(projection);

  select('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('.country')
    .data(data)
    .enter()
    .append('path')
    .classed('country', true)
    .attr('stroke', 'white')
    .attr('strokeWidth', 0.75)
    .attr('d', path as any);
};

// export const selectFeatures = (node: any, feature: string) => {
//   return select(node)
//     .append('g')
//     .classed(feature, true);
// };

// export const getFeatures = (data: any) => {
//   return select('g')
//     .selectAll('path')
//     .data(data);
// };

// export const projectMap = (context: any, d: any, projection: any) => {
//   select(context).attr('d', d3.geoPath().projection(projection())(d));
// };
