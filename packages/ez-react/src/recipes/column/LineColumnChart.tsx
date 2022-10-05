import React, { FC } from 'react';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';
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
import { ColumnChartProps } from '@/recipes/column/ColumnChart';
import { Points } from '@/components/Points';
import { LinePath } from '@/components/shapes/LinePath';
import { Point } from '@/components/shapes/Point';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { ColorScale } from '@/components/scales/ColorScale';
import { useToggableDatum } from '@/lib/useToggableDatum';

export interface LineColumnChartProps extends ColumnChartProps {
  yLineAxis?: AxisConfig<Position.LEFT | Position.RIGHT>;
  line?: LineConfig;
  marker?: MarkerConfig;
}

export const LineColumnChart: FC<LineColumnChartProps> = ({
  data,
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
}) => {
  const { activeData, activeColors, toggleDatum } = useToggableDatum(
    data,
    xAxis.domainKey,
    colors
  );
  return (
    <Chart
      dimensions={dimensions}
      rawData={activeData}
      padding={padding}
      animationOptions={animationOptions}
      scopedSlots={scopedSlots}
      isRTL={isRTL}
      onLegendClick={toggleDatum}
    >
      <CartesianScale
        xScaleConfig={{
          ScaleClass: ScaleBand,
          definition: {
            direction: Direction.HORIZONTAL,
            domainKey: xAxis.domainKey,
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
        <ColorScale domainKey={xAxis.domainKey} range={activeColors}>
          <Bars xDomainKey={xAxis.domainKey} yDomainKey={yAxis.domainKey} />
        </ColorScale>
        <Axis {...xAxis} position={xAxis.position || Position.BOTTOM} />
        <Axis
          {...yAxis}
          position={yAxis.position || (isRTL ? Position.RIGHT : Position.LEFT)}
        />
      </CartesianScale>
      <CartesianScale
        xScaleConfig={{
          ScaleClass: ScaleBand,
          definition: {
            direction: Direction.HORIZONTAL,
            domainKey: xAxis.domainKey,
            innerPadding: 0.5,
            outerPadding: 0.1,
            align: 1,
          },
        }}
        yScaleConfig={{
          ScaleClass: ScaleLinear,
          definition: {
            direction: Direction.VERTICAL,
            domainKey: yLineAxis.domainKey,
            nice: yAxis.nice || 0,
          },
        }}
      >
        <Points
          xDomainKey={xAxis.domainKey}
          yDomainKey={yLineAxis.domainKey}
          scopedSlots={{
            default: ({ shapeData }) => {
              return (
                <g className="ez-line">
                  <LinePath
                    shapeData={shapeData}
                    curve={line.curve}
                    beta={line.beta}
                    stroke={line.stroke}
                    strokeWidth={line.strokeWidth}
                  />
                  {!marker.hidden &&
                    shapeData.map((pointDatum) => {
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
          {...yLineAxis}
          position={
            yLineAxis.position || (isRTL ? Position.LEFT : Position.RIGHT)
          }
        />
      </CartesianScale>
    </Chart>
  );
};
