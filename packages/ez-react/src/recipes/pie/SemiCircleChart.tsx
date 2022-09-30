import React, { FC, useMemo } from 'react';
import { Direction } from 'eazychart-core/src/types';
import { Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Pie } from '@/components/Pie';
import { Legend } from '@/components/addons/legend/Legend';
import { PieChartProps } from './PieChart';
import { ScaleLinear } from 'eazychart-core/src';

export type SemiCircleChartProps = PieChartProps;

export const SemiCircleChart: FC<SemiCircleChartProps> = ({
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
}) => {
  const scale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        direction: Direction.HORIZONTAL,
        domainKey,
      }),
    [domainKey]
  );
  return (
    <Chart
      dimensions={dimensions}
      rawData={data}
      scales={[scale]}
      padding={padding}
      colors={colors}
      animationOptions={animationOptions}
      scopedSlots={scopedSlots}
    >
      <Pie
        aScale={scale}
        getCenter={({ width, height }) => ({ x: width / 2, y: height })}
        getRadius={({ width, height }) => Math.min(width, height)}
        startAngle={Math.PI / 2}
        endAngle={-Math.PI / 2}
        {...arc}
      />
    </Chart>
  );
};
