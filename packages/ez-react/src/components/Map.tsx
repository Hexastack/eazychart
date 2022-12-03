import React from 'react';
import {
  AnimationOptions,
  ChartPadding,
  Dimensions,
  RawData,
} from 'eazychart-core/src/types';
import { MapPath } from './shapes/MapPath';

export type MapChartProps = {
  padding?: Partial<ChartPadding>;
  dimensions?: Partial<Dimensions>;
  animationOptions?: AnimationOptions;
  rawData: RawData;
  isWrapped?: boolean;
};

export default function Map({ mapData }: any) {
  return (
    <g>
      {mapData.map((e: any) => (
        <MapPath feature={e} projectionType={''}></MapPath>
      ))}
    </g>
  );
}
