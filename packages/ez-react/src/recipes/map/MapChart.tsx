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
import { dimensions } from 'eazychart-dev/storybook/data';

export interface MapChartProps extends SVGAttributes<SVGGElement> {
  mapData: any;
  projectionType: string;
  stroke: string;
  fill: string;
  data: RawData;
  scale: number;
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
  projectionType,
  stroke,
  fill,
  scale,
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
        stroke={stroke}
        fill={fill}
        scale={scale}
        mapData={mapData}
        projectionType={projectionType}
        padding={padding}
      />
    </Chart>
  );
};
