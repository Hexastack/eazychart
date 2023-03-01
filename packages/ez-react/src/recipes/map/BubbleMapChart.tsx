import React, { FC, SVGAttributes } from 'react';
import {
  AnimationOptions,
  ChartPadding,
  Dimensions,
  RawData,
  GeoJsonData,
  MapConfig,
} from 'eazychart-core/src/types';
import { BubbleMap } from '../../components/BubbleMap';
import { LegendProps } from '@/components/addons/legend/Legend';
import { Tooltip, TooltipProps } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { ColorScale } from '@/components/scales/ColorScale';
import { BubbleConfig } from 'eazychart-core/src/utils/types';

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
    LegendComponent: React.FC<LegendProps>;
    TooltipComponent: React.FC<TooltipProps>;
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
    minRange: 0,
    maxRange: 30,
    opacity: 0.5,
    fill: 'orange',
    stroke: 'black',
  },
  scopedSlots = {
    // @todo : support Legend
    // LegendComponent: Legend,
    TooltipComponent: Tooltip,
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
      scopedSlots={scopedSlots}
    >
      <ColorScale
        type={'quantile'}
        domainKey={map.valueDomainKey}
        range={colors}
      >
        <BubbleMap map={map} geoJson={geoJson} bubbles={bubbles} />
      </ColorScale>
    </Chart>
  );
};
