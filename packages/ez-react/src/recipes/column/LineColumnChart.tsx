import React, { FC, useMemo } from 'react';
import {
  AxisConfig,
  Direction,
  Position,
  LineConfig,
  MarkerConfig,
} from 'eazychart-core/src/types';
import { Axis } from '@/components/scales/Axis';
import { Chart } from '@/components/Chart';
import { Bars } from '@/components/Bars';
import { Legend } from '@/components/addons/legend/Legend';
import { Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Grid } from '@/components/scales/grid/Grid';
import { ColumnChartProps } from './ColumnChart';
import { Points } from '@/components/Points';
import { LinePath } from '@/components/shapes/LinePath';
import { Point } from '@/components/shapes/Point';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';

export interface LineColumnChartProps extends ColumnChartProps {
  yLineAxis?: AxisConfig<Position.LEFT | Position.RIGHT>;
  line?: LineConfig;
  marker?: MarkerConfig;
}

export const LineColumnChart: FC<LineColumnChartProps> = ({
  rawData,
  line = {
    stroke: '#339999',
    strokeWidth: 2,
    curve: 'curveLinear',
  },
  marker = {
    hidden: true,
    radius: 5,
    color: '#FFF',
  },
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
  yLineAxis = {
    domainKey: 'yLineValue',
    position: Position.RIGHT,
  },
  isRTL = false,
  dimensions = {},
  scopedSlots = {
    LegendComponent: Legend,
    TooltipComponent: Tooltip,
  },
  onResize,
}) => {
  const xColumnScale = useMemo<ScaleBand>(
    () =>
      new ScaleBand({
        direction: Direction.HORIZONTAL,
        domainKey: xAxis.domainKey,
      }),
    [xAxis]
  );
  const yColumnScale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        direction: Direction.VERTICAL,
        domainKey: yAxis.domainKey,
        nice: yAxis.nice || 0,
      }),
    [yAxis]
  );
  const xLineScale = useMemo<ScaleBand>(
    () =>
      new ScaleBand({
        direction: Direction.HORIZONTAL,
        domainKey: xAxis.domainKey,
        innerPadding: 0.5,
        outerPadding: 0.1,
        align: 1,
      }),
    [xAxis]
  );
  const yLineScale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        direction: Direction.VERTICAL,
        domainKey: yLineAxis.domainKey,
        nice: yAxis.nice || 0,
      }),
    [yAxis, yLineAxis]
  );

  return (
    <Chart
      dimensions={dimensions}
      rawData={rawData}
      scales={[xColumnScale, yColumnScale, xLineScale, yLineScale]}
      padding={padding}
      colors={colors}
      animationOptions={animationOptions}
      scopedSlots={scopedSlots}
      isRTL={isRTL}
      onResize={onResize}
    >
      <Grid
        directions={grid.directions}
        color={grid.color}
        xScale={xColumnScale}
        yScale={yColumnScale}
      />
      <Bars xScale={xColumnScale} yScale={yColumnScale} />
      <Points
        xScale={xLineScale}
        yScale={yLineScale}
        scopedSlots={{
          default: ({ scaledData }) => {
            return (
              <g className="ez-line">
                <LinePath
                  shapeData={scaledData}
                  curve={line.curve}
                  beta={line.beta}
                  stroke={line.stroke}
                  strokeWidth={line.strokeWidth}
                />
                {!marker.hidden &&
                  scaledData.map((pointDatum) => {
                    return (
                      <Point
                        key={pointDatum.id}
                        shapeDatum={pointDatum}
                        r={marker.radius}
                        stroke={marker.color}
                        fill={marker.color}
                        strokeWidth={line.strokeWidth}
                      />
                    );
                  })}
              </g>
            );
          },
        }}
      />
      <Axis
        aScale={xColumnScale}
        position={xAxis.position || Position.BOTTOM}
        title={xAxis.title}
        titleAlign={xAxis.titleAlign}
        tickCount={xAxis.tickCount}
        tickSize={xAxis.tickSize}
        tickLength={xAxis.tickLength}
        tickFormat={xAxis.tickFormat}
      />
      <Axis
        aScale={yColumnScale}
        position={yAxis.position || (isRTL ? Position.RIGHT : Position.LEFT)}
        title={yAxis.title}
        titleAlign={yAxis.titleAlign}
        tickCount={yAxis.tickCount}
        tickSize={yAxis.tickSize}
        tickLength={yAxis.tickLength}
        tickFormat={yAxis.tickFormat}
      />
      <Axis
        aScale={yLineScale}
        position={
          yLineAxis.position || (isRTL ? Position.LEFT : Position.RIGHT)
        }
        title={yLineAxis.title}
        titleAlign={yLineAxis.titleAlign}
        tickCount={yLineAxis.tickCount}
        tickSize={yLineAxis.tickSize}
        tickLength={yLineAxis.tickLength}
        tickFormat={yLineAxis.tickFormat}
      />
    </Chart>
  );
};
