import React from 'react';
import {
  AnimationOptions,
  ChartPadding,
  Dimensions,
  RawData,
  GeoJSONData,
  MapConfig,
} from 'eazychart-core/src/types';
import { MapPath } from './shapes/MapPath';
import { dimensions } from 'eazychart-dev/storybook/data';

export type MapChartProps = {
  padding?: Partial<ChartPadding>;
  dimensions?: Partial<Dimensions>;
  animationOptions?: AnimationOptions;
  rawData: RawData;
  isWrapped?: boolean;
  map: MapConfig;
  mapData: [GeoJSONData];
};

export default function Map({ mapData, map, padding }: MapChartProps) {
  return (
    <g>
      {mapData.map((e: any, idx: number) => (
        <MapPath
          key={idx}
          feature={e}
          projectionType={map.projectionType}
          stroke={map.stroke}
          fill={map.fill}
          scale={map.scale}
          width={dimensions.width}
          height={dimensions.height}
          padding={padding}
        />
      ))}
    </g>
  );
}
