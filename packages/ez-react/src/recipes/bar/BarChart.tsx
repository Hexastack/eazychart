import React, { FC, SVGAttributes, useMemo } from 'react';
import {
  AnimationOptions,
  AxisConfig,
  ChartPadding,
  Dimensions,
  Direction,
  GridConfig,
  Position,
  RawData,
} from 'eazychart-core/src/types';
import { Axis } from '@/components/scales/Axis';
import { Chart } from '@/components/Chart';
import { Bars } from '@/components/Bars';
import { Legend, LegendPropsWithRef } from '@/components/addons/legend/Legend';
import { Tooltip, TooltipProps } from '@/components/addons/tooltip/Tooltip';
import { Grid } from '@/components/scales/grid/Grid';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';

export interface BarChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  colors?: string[];
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  grid?: GridConfig;
  isRTL?: boolean;
  xAxis?: AxisConfig<Position.BOTTOM | Position.TOP>;
  yAxis?: AxisConfig<Position.LEFT | Position.RIGHT>;
  dimensions?: Partial<Dimensions>;
  scopedSlots?: {
    LegendComponent?: React.FC<LegendPropsWithRef>;
    TooltipComponent?: FC<TooltipProps>;
  };
}

export const BarChart: FC<BarChartProps> = ({
  data,
  colors = ['#339999', '#993399', '#333399'],
  animationOptions = {
    easing: 'easeBack',
    duration: 400,
    delay: 0,
  },
  padding = {
    left: 150,
    bottom: 100,
    right: 150,
    top: 100,
  },
  grid = {
    directions: [Direction.HORIZONTAL, Direction.VERTICAL],
    color: '#a8a8a8',
  },
  xAxis = {
    domainKey: 'xValue',
    position: Position.BOTTOM,
  },
  yAxis = {
    domainKey: 'yValue',
    position: Position.LEFT,
  },
  isRTL = false,
  dimensions = {},
  scopedSlots = {
    LegendComponent: Legend,
    TooltipComponent: Tooltip,
  },
}) => {
  const xScale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        direction: Direction.HORIZONTAL,
        domainKey: xAxis.domainKey,
        nice: xAxis.nice || 0,
        reverse: isRTL,
      }),
    [isRTL, xAxis]
  );
  const yScale = useMemo<ScaleBand>(
    () =>
      new ScaleBand({
        direction: Direction.VERTICAL,
        domainKey: yAxis.domainKey,
      }),
    [yAxis]
  );

  return (
    <Chart
      dimensions={dimensions}
      rawData={data}
      scales={[xScale, yScale]}
      padding={padding}
      colors={colors}
      animationOptions={animationOptions}
      scopedSlots={scopedSlots}
      isRTL={isRTL}
    >
      <Grid
        directions={grid.directions}
        color={grid.color}
        xScale={xScale}
        yScale={yScale}
      />
      <Bars xScale={xScale} yScale={yScale} />
      <Axis
        aScale={xScale}
        position={xAxis.position || Position.BOTTOM}
        title={xAxis.title}
        titleAlign={xAxis.titleAlign}
        tickCount={xAxis.tickCount}
        tickSize={xAxis.tickSize}
        tickLength={xAxis.tickLength}
        tickFormat={xAxis.tickFormat}
      />
      <Axis
        aScale={yScale}
        position={yAxis.position || (isRTL ? Position.RIGHT : Position.LEFT)}
        title={yAxis.title}
        titleAlign={yAxis.titleAlign}
        tickCount={yAxis.tickCount}
        tickSize={yAxis.tickSize}
        tickLength={yAxis.tickLength}
        tickFormat={yAxis.tickFormat}
      />
    </Chart>
  );
};
