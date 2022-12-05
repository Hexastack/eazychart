import React from 'react';
import {
  AnimationOptions,
  ChartPadding,
  Dimensions,
  RawData,
} from 'eazychart-core/src/types';
import { MapPath } from './shapes/MapPath';
import { dimensions } from 'eazychart-dev/storybook/data';

export type MapChartProps = {
  padding?: Partial<ChartPadding>;
  dimensions?: Partial<Dimensions>;
  animationOptions?: AnimationOptions;
  stroke: string;
  fill: string;
  scale: number;
  rawData: RawData;
  isWrapped?: boolean;
  projectionType: string;
  mapData: any;
};

export default function Map({
  mapData,
  projectionType,
  stroke,
  padding,
  fill,
  scale,
}: MapChartProps) {
  return (
    <g>
      {mapData.map((e: any) => (
        <MapPath
          feature={e}
          projectionType={projectionType}
          stroke={stroke}
          fill={fill}
          scale={scale}
          width={dimensions.width}
          height={dimensions.height}
          padding={padding}
        ></MapPath>
      ))}
    </g>
  );
}
