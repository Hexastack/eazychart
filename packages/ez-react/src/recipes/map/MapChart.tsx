import React, { FC, SVGAttributes } from 'react';
import {
  AnimationOptions,
  ChartPadding,
  Dimensions,
  GridConfig,
  RawData,
} from 'eazychart-core/src/types';
import Map from '@/components/Map';
import { Legend, LegendProps } from '@/components/addons/legend/Legend';
import { Tooltip, TooltipProps } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';

export interface MapChartProps extends SVGAttributes<SVGGElement> {
  mapData: any;
  data: RawData;
  colors?: string[];
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  grid?: GridConfig;
  isRTL?: boolean;
  dimensions?: Partial<Dimensions>;
  scopedSlots?: {
    LegendComponent: React.FC<LegendProps>;
    TooltipComponent: React.FC<TooltipProps>;
  };
}

export const MapChart: FC<MapChartProps> = ({
  mapData,
  data,
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
  isRTL = false,
  dimensions = {},
  scopedSlots = {
    LegendComponent: Legend,
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
      <Map
        dimensions={dimensions}
        rawData={data}
        mapData={mapData}
        padding={padding}
        animationOptions={animationOptions}
        scopedSlots={scopedSlots}
        isRTL={isRTL}
      />
    </Chart>
  );
};
