import React, { FC, SVGAttributes } from 'react';
import {
  AnimationOptions,
  ChartPadding,
  Dimensions,
  RawData,
  GeoJSONData,
  MapConfig,
} from 'eazychart-core/src/types';
import Map from '@/components/Map';
import { LegendProps } from '@/components/addons/legend/Legend';
import { Tooltip, TooltipProps } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { dimensions } from 'eazychart-dev/storybook/data';
import { ColorScale } from '@/components/scales/ColorScale';

export interface MapChartProps extends SVGAttributes<SVGGElement> {
  mapData: GeoJSONData;
  colors?: string[];
  map: MapConfig;
  data: RawData;
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  dimensions?: Partial<Dimensions>;
  scopedSlots?: {
    LegendComponent: React.FC<LegendProps>;
    TooltipComponent: React.FC<TooltipProps>;
  };
}

export const MapChart: FC<MapChartProps> = ({
  mapData,
  data,
  colors = ['red', 'blue', 'orange', 'yellow'],
  map = {
    geoDomainKey: 'geo_code',
    valueDomainKey: 'poverty',
    projectionType: 'geoMercator',
    stroke: 'white',
    fill: 'blue',
    scale: 100,
  },

  animationOptions = {
    easing: 'easeBack',
    duration: 400,
    delay: 0,
  },
  padding = {
    left: 150,
    bottom: 100,
    right: 100,
    top: 100,
  },
  scopedSlots = {
    // @todo : support Legend
    // LegendComponent: Legend,
    TooltipComponent: Tooltip,
  },
}) => {
  return (
    <Chart
      dimensions={dimensions}
      rawData={data}
      padding={padding}
      animationOptions={animationOptions}
      scopedSlots={scopedSlots}
    >
      <ColorScale
        type={'quantile'}
        domainKey={map.valueDomainKey}
        range={colors}
      >
        <Map map={map} mapData={mapData} />
      </ColorScale>
    </Chart>
  );
};
