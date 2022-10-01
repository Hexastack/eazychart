import React, { FC, SVGAttributes } from 'react';
import {
  RawData,
  AnimationOptions,
  ChartPadding,
  Dimensions,
  PieConfig,
} from 'eazychart-core/src/types';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Pie } from '@/components/Pie';
import { Legend, LegendPropsWithRef } from '@/components/addons/legend/Legend';

export interface PieChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  colors?: string[];
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  domainKey?: string;
  arc?: PieConfig;
  dimensions?: Partial<Dimensions>;
  scopedSlots?: {
    LegendComponent: React.FC<LegendPropsWithRef>;
    TooltipComponent: React.FC<TooltipProps>;
  };
  onResize?: (dimensions: Dimensions) => void;
}

export const PieChart: FC<PieChartProps> = ({
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
    donutRadius: 0,
    cornerRadius: 0,
    padAngle: 0,
    padRadius: 0,
    stroke: '#FFF',
    strokeWidth: 0,
  },
  dimensions = {},
  scopedSlots = {
    LegendComponent: Legend,
    TooltipComponent: Tooltip,
  },
  onResize,
}) => {
  return (
    <Chart
      dimensions={dimensions}
      rawData={data}
      padding={padding}
      colors={colors}
      animationOptions={animationOptions}
      scopedSlots={scopedSlots}
      onResize={onResize}
    >
      <Pie domainKey={domainKey} {...arc} />
    </Chart>
  );
};
