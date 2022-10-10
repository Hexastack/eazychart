import React, { FC, SVGAttributes } from 'react';
import {
  Direction,
  Position,
  RawData,
  AnimationOptions,
  ChartPadding,
  GridConfig,
  AxisConfig,
  Dimensions,
  PointConfig,
} from 'eazychart-core/src/types';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Points } from '@/components/Points';
import { Axis } from '@/components/scales/Axis';
import { Grid } from '@/components/scales/grid/Grid';
import { ScaleLinear } from 'eazychart-core/src';
import { CartesianScale } from '@/components/scales/CartesianScale';

export interface ScatterChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  point?: PointConfig;
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  grid?: GridConfig;
  xAxis?: AxisConfig<Position.BOTTOM | Position.TOP>;
  yAxis?: AxisConfig<Position.LEFT | Position.RIGHT>;
  isRTL?: boolean;
  dimensions?: Partial<Dimensions>;
  scopedSlots?: {
    TooltipComponent: FC<TooltipProps>;
  };
}

export const ScatterChart: FC<ScatterChartProps> = ({
  data,
  point = {
    radius: 5,
    color: '#339999',
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
  grid = {
    directions: [Direction.HORIZONTAL, Direction.VERTICAL],
    color: '#a8a8a8',
  },
  xAxis = {
    domainKey: 'xValue',
  },
  yAxis = {
    domainKey: 'yValue',
  },
  isRTL = false,
  dimensions = {},
  scopedSlots = {
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
      <CartesianScale
        xScaleConfig={{
          ScaleClass: ScaleLinear,
          definition: {
            direction: Direction.HORIZONTAL,
            domainKey: xAxis.domainKey,
            nice: xAxis.nice || 0,
            reverse: isRTL,
          },
        }}
        yScaleConfig={{
          ScaleClass: ScaleLinear,
          definition: {
            direction: Direction.VERTICAL,
            domainKey: yAxis.domainKey,
            nice: yAxis.nice || 0,
          },
        }}
      >
        <Grid directions={grid.directions} color={grid.color} />
        <Points
          xDomainKey={xAxis.domainKey}
          yDomainKey={yAxis.domainKey}
          r={point.radius}
          fill={point.color}
          stroke={point.color}
        />
        <Axis {...xAxis} position={xAxis.position || Position.BOTTOM} />
        <Axis
          {...yAxis}
          position={yAxis.position || (isRTL ? Position.RIGHT : Position.LEFT)}
        />
      </CartesianScale>
    </Chart>
  );
};
