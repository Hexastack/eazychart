import React, { FC, SVGAttributes } from 'react';
import {
  AnimationOptions,
  ChartPadding,
  Dimensions,
  RawData,
  GeoJsonData,
  MapConfig,
  ShapeClickEventHandler,
} from 'eazychart-core/src/types';
import { Map } from '@/components/Map';
import { LegendProps } from '@/components/addons/legend/Legend';
import { Tooltip, TooltipProps } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { ColorScale } from '@/components/scales/ColorScale';

export interface MapChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  geoJson: GeoJsonData;
  colors?: string[];
  map: MapConfig;
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  dimensions?: Partial<Dimensions>;
  onShapeClick?: ShapeClickEventHandler;
  scopedSlots?: {
    LegendComponent: React.FC<LegendProps>;
    TooltipComponent: React.FC<TooltipProps>;
  };
}

export const MapChart: FC<MapChartProps> = ({
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
  onShapeClick,
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
      onShapeClick={onShapeClick}
      scopedSlots={scopedSlots}
    >
      <ColorScale
        type={'quantile'}
        domainKey={map.valueDomainKey}
        range={colors}
      >
        <Map map={map} geoJson={geoJson} />
      </ColorScale>
    </Chart>
  );
};
