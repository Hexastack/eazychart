import React, { FC, SVGAttributes } from 'react';
import {
  AnimationOptions,
  ChartPadding,
  Dimensions,
  RawData,
  GeoJsonData,
  MapConfig,
} from 'eazychart-core/src/types';
import { Map } from '../../components/Map';
import { Chart } from '@/components/Chart';
import { ColorScale } from '@/components/scales/ColorScale';
import { BubbleConfig } from 'eazychart-core/src/utils/types';
import { SqrtScale } from '@/components/scales/SqrtScale';
import { Point } from '@/components/shapes/Point';
import { ScaleSqrt } from 'eazychart-core/src';

export interface BubbleMapChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  geoJson: GeoJsonData;
  colors?: string[];
  map: MapConfig;
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  dimensions?: Partial<Dimensions>;
  bubbles: BubbleConfig;
  scopedSlots?: {
    default: ({
      shapeDatum,
      scales,
    }: {
      shapeDatum: any;
      scales: { rScale: ScaleSqrt };
    }) => React.ReactChild;
  };
}

export const BubbleMapChart: FC<BubbleMapChartProps> = ({
  data,
  geoJson,
  colors = ['white', 'pink', 'red'],
  map = {
    geoDomainKey: 'geo_code',
    valueDomainKey: 'value',
    projectionType: 'geoMercator',
    stroke: 'white',
    fill: 'black',
  },
  animationOptions = {
    easing: 'easeBack',
    duration: 400,
    delay: 0,
  },
  padding = {
    left: 100,
    bottom: 100,
    right: 100,
    top: 100,
  },
  dimensions = {},
  bubbles = {
    domainKey: 'value',
    minRange: 0,
    maxRange: 30,
    opacity: 0.5,
    fill: 'orange',
    stroke: 'black',
  },
}) => {
  if (geoJson && !('features' in geoJson)) {
    throw new Error(
      'GeoJSON must contain features so that each feature is mapped to a data item.'
    );
  }

  return (
    <Chart
      dimensions={dimensions}
      rawData={data}
      padding={padding}
      animationOptions={animationOptions}
    >
      <SqrtScale
        domainKey={bubbles.domainKey}
        domain={[0, 100]}
        range={[bubbles.minRange, bubbles.maxRange]}
      >
        <ColorScale
          type={'quantile'}
          domainKey={map.valueDomainKey}
          range={colors}
        >
          <Map
            map={map}
            geoJson={geoJson}
            bubbles={bubbles}
            scopedSlots={{
              default: ({ shapeDatum, scales }) => {
                return (
                  <g className="ez-map-bubble">
                    <Point
                      key={shapeDatum.id}
                      shapeDatum={shapeDatum}
                      r={scales.rScale.scale((shapeDatum as any).radius)}
                      fill={shapeDatum.color}
                      stroke={bubbles.stroke}
                      strokeWidth={1}
                      opacity={bubbles.opacity}
                    />
                  </g>
                );
              },
            }}
          />
        </ColorScale>
      </SqrtScale>
    </Chart>
  );
};
