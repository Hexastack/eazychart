import React, { FC, SVGAttributes } from 'react';
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
  ShapeClickEventHandler,
} from 'eazychart-core/src/types';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Axis } from '@/components/scales/Axis';
import { Grid } from '@/components/scales/grid/Grid';
import { Bubbles } from '@/components/Bubbles';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { LinearScale } from '@/components/scales/LinearScale';

export interface BubbleChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  bubble?: BubbleConfig;
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  grid?: GridConfig;
  xAxis?: AxisConfig<Position.BOTTOM | Position.TOP>;
  yAxis?: AxisConfig<Position.LEFT | Position.RIGHT>;
  isRTL?: boolean;
  dimensions?: Partial<Dimensions>;
  onShapeClick?: ShapeClickEventHandler;
  scopedSlots?: {
    TooltipComponent: FC<TooltipProps>;
  };
}

export const BubbleChart: FC<BubbleChartProps> = ({
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
  onShapeClick,
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
      onShapeClick={onShapeClick}
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
        <LinearScale
          domainKey={bubble.domainKey}
          range={[bubble.minRadius, bubble.maxRadius]}
        >
          <Bubbles
            xDomainKey={xAxis.domainKey}
            yDomainKey={yAxis.domainKey}
            rDomainKey={bubble.domainKey}
            fill={bubble.fill}
          />
        </LinearScale>
        <Axis {...xAxis} position={xAxis.position || Position.BOTTOM} />
        <Axis
          {...yAxis}
          position={yAxis.position || (isRTL ? Position.RIGHT : Position.LEFT)}
        />
      </CartesianScale>
    </Chart>
  );
};
