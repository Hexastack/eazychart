import React, { FC, SVGAttributes, useMemo } from 'react';
import { ScaleLinear } from 'eazychart-core/src';
import {
  Direction,
  RawData,
  AnimationOptions,
  ChartPadding,
  Dimensions,
  RadialConfig,
} from 'eazychart-core/src/types';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Legend, LegendPropsWithRef } from '@/components/addons/legend/Legend';
import { Arcs } from '@/components/Arcs';
import { RadialScale } from '@/components/scales/RadialScale';

export interface RadialChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  colors?: string[];
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  domainKey?: string;
  index?: number;
  arc?: RadialConfig;
  dimensions?: Partial<Dimensions>;
  scopedSlots?: {
    LegendComponent: React.FC<LegendPropsWithRef>;
    TooltipComponent: React.FC<TooltipProps>;
  };
}

export const RadialChart: FC<RadialChartProps> = ({
  data,
  colors = ['#339999', '#993399', '#333399'],
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
  domainKey = 'value',
  arc = {
    cornerRadius: 0,
    stroke: '#FFF',
    strokeWidth: 0,
    spacing: 0,
  },
  dimensions = {},
  scopedSlots = {
    LegendComponent: Legend,
    TooltipComponent: Tooltip,
  },
}) => {
  const rScale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        direction: Direction.HORIZONTAL,
        range: [0, Math.PI * 2],
        domainKey,
      }),
    [domainKey]
  );
  return (
    <Chart
      dimensions={dimensions}
      rawData={data}
      padding={padding}
      colors={colors}
      animationOptions={animationOptions}
      scopedSlots={scopedSlots}
    >
      <RadialScale rScale={rScale}>
        <Arcs domainKey={domainKey} {...arc} />
      </RadialScale>
    </Chart>
  );
};
