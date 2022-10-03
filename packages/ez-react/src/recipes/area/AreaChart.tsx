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
  AreaConfig,
  MarkerConfig,
  AreaData,
} from 'eazychart-core/src/types';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Points } from '@/components/Points';
import { Axis } from '@/components/scales/Axis';
import { Grid } from '@/components/scales/grid/Grid';
import { LinePath } from '@/components/shapes/LinePath';
import { Point } from '@/components/shapes/Point';
import { Area } from '@/components/shapes/Area';
import { CartesianScale } from '@/components/scales/CartesianScale';

export interface AreaChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  area?: AreaConfig;
  marker?: MarkerConfig;
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  grid?: GridConfig;
  isRTL?: boolean;
  xAxis?: AxisConfig<Position.BOTTOM | Position.TOP>;
  yAxis?: AxisConfig<Position.LEFT | Position.RIGHT>;
  dimensions?: Partial<Dimensions>;
  scopedSlots?: {
    TooltipComponent?: FC<TooltipProps>;
  };
}

export const AreaChart: FC<AreaChartProps> = ({
  data,
  area = {
    stroke: '#339999',
    strokeWidth: 2,
    fill: '#ef476f80',
    curve: 'curveLinear',
  },
  marker = {
    hidden: true,
    radius: 5,
    color: '#FFF',
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
          scopedSlots={{
            default: ({ shapeData, dimensions: chartDimensions }) => {
              const lineAreaData: AreaData = shapeData.map((d) => {
                return {
                  x: d.x,
                  y0: chartDimensions.height,
                  y1: d.y,
                };
              });
              return (
                <g className="ez-area">
                  <Area
                    shapeData={lineAreaData}
                    curve={area.curve}
                    beta={area.beta}
                    fill={area.fill}
                  />
                  <LinePath
                    shapeData={shapeData}
                    curve={area.curve}
                    beta={area.beta}
                    stroke={area.stroke}
                    strokeWidth={area.strokeWidth}
                  />
                  {!marker.hidden &&
                    shapeData.map((shapeDatum) => {
                      return (
                        <Point
                          key={shapeDatum.id}
                          shapeDatum={shapeDatum}
                          r={marker.radius}
                          fill={marker.color}
                          stroke={area.stroke}
                          strokeWidth={area.strokeWidth}
                        />
                      );
                    })}
                </g>
              );
            },
          }}
        />
        <Axis
          position={xAxis.position || Position.BOTTOM}
          title={xAxis.title}
          titleAlign={xAxis.titleAlign}
          tickLength={xAxis.tickLength}
          tickCount={xAxis.tickCount}
          tickSize={xAxis.tickLength}
          tickFormat={xAxis.tickFormat}
        />
        <Axis
          position={yAxis.position || (isRTL ? Position.RIGHT : Position.LEFT)}
          title={yAxis.title}
          titleAlign={yAxis.titleAlign}
          tickLength={yAxis.tickLength}
          tickCount={yAxis.tickCount}
          tickSize={yAxis.tickLength}
          tickFormat={yAxis.tickFormat}
        />
      </CartesianScale>
    </Chart>
  );
};
