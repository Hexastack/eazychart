import React, { FC, SVGAttributes, useMemo } from 'react';
import { ScaleLinear } from 'eazychart-core/src';
import {
  Direction,
  Position,
  RawData,
  AnimationOptions,
  ChartPadding,
  GridConfig,
  AxisConfig,
  Dimensions,
  BubbleConfig,
} from 'eazychart-core/src/types';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Axis } from '@/components/scales/Axis';
import { Grid } from '@/components/scales/grid/Grid';
import { Bubbles } from '@/components/Bubbles';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { LinearScale } from '@/components/scales/LinearScale';

export interface BubbleChartProps extends SVGAttributes<SVGGElement> {
  swapAxis?: boolean;
  data: RawData;
  bubble?: BubbleConfig;
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
  onResize?: (dimensions: Dimensions) => void;
}

export const BubbleChart: FC<BubbleChartProps> = ({
  swapAxis = false,
  data,
  bubble = {
    domainKey: 'yValue',
    minRadius: 1,
    maxRadius: 100,
    fill: '#339999a0',
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
  onResize,
}) => {
  const horizontalAxis = swapAxis ? yAxis : xAxis;
  const verticalAxis = swapAxis ? xAxis : yAxis;
  const xScale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        direction: Direction.HORIZONTAL,
        domainKey: horizontalAxis.domainKey,
        nice: horizontalAxis.nice || 0,
        reverse: isRTL,
      }),
    [horizontalAxis, isRTL]
  );
  const yScale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        direction: Direction.VERTICAL,
        domainKey: verticalAxis.domainKey,
        nice: verticalAxis.nice || 0,
      }),
    [verticalAxis]
  );
  const rScale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        domainKey: bubble.domainKey,
        range: [bubble.minRadius, bubble.maxRadius],
      }),
    [bubble]
  );
  return (
    <Chart
      dimensions={dimensions}
      rawData={data}
      padding={padding}
      animationOptions={animationOptions}
      scopedSlots={scopedSlots}
      onResize={onResize}
    >
      <CartesianScale xScale={xScale} yScale={yScale}>
        <Grid directions={grid.directions} color={grid.color} />
        <LinearScale linearScale={rScale}>
          <Bubbles
            xDomainKey={xAxis.domainKey}
            yDomainKey={yAxis.domainKey}
            rDomainKey={bubble.domainKey}
            fill={bubble.fill}
          />
        </LinearScale>
        <Axis
          position={horizontalAxis.position || Position.BOTTOM}
          title={horizontalAxis.title}
          titleAlign={horizontalAxis.titleAlign}
          tickLength={horizontalAxis.tickLength}
          tickCount={horizontalAxis.tickCount}
          tickSize={horizontalAxis.tickLength}
          tickFormat={horizontalAxis.tickFormat}
        />
        <Axis
          position={
            verticalAxis.position || (isRTL ? Position.RIGHT : Position.LEFT)
          }
          title={verticalAxis.title}
          titleAlign={verticalAxis.titleAlign}
          tickLength={verticalAxis.tickLength}
          tickCount={verticalAxis.tickCount}
          tickSize={verticalAxis.tickLength}
          tickFormat={verticalAxis.tickFormat}
        />
      </CartesianScale>
    </Chart>
  );
};
