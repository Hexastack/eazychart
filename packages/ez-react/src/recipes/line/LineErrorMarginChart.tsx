import React, { FC, SVGAttributes, useMemo } from 'react';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Points } from '@/components/Points';
import { Axis } from '@/components/scales/Axis';
import { Grid } from '@/components/scales/grid/Grid';
import { LinePath } from '@/components/shapes/LinePath';
import { Point } from '@/components/shapes/Point';
import { Area } from '@/components/shapes/Area';
import { getDataMarginBounds, ScaleLinear } from 'eazychart-core/src';
import {
  LineConfig,
  RawData,
  AreaConfig,
  MarkerConfig,
  AnimationOptions,
  ChartPadding,
  GridConfig,
  AxisConfig,
  Position,
  Dimensions,
  Direction,
  RawDatum,
  AreaData,
  AreaCurve,
} from 'eazychart-core/src/types';

export interface LineErrorMarginChartProps extends SVGAttributes<SVGGElement> {
  line: LineConfig;
  swapAxis?: boolean;
  rawData: RawData;
  area?: Partial<AreaConfig>;
  marker?: MarkerConfig;
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  grid?: GridConfig;
  isRTL?: boolean;
  xAxis?: AxisConfig<Position.BOTTOM | Position.TOP>;
  yAxis?: AxisConfig<Position.LEFT | Position.RIGHT>;
  dimensions?: Partial<Dimensions>;
  errorMargins?: {
    positive: string; // in percent [0..1]
    negative: string; // in percent [0..1]
  };
  scopedSlots?: {
    TooltipComponent?: FC<TooltipProps>;
  };
}

export const LineErrorMarginChart: FC<LineErrorMarginChartProps> = ({
  swapAxis = false,
  rawData,
  line = {
    stroke: '#339999',
    strokeWidth: 2,
    curve: 'curveBasis',
  },
  area = {
    fill: '#ef476f80',
  },
  marker = {
    hidden: false,
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
  errorMargins = { positive: 'positiveMargin', negative: 'negativeMargin' },
  isRTL = false,
  dimensions = {},
  scopedSlots = {
    TooltipComponent: Tooltip,
  },
}) => {
  const horizontalAxis = swapAxis ? yAxis : xAxis;
  const verticalAxis = swapAxis ? xAxis : yAxis;

  const [lowsestMarginValue, highestMarginValue] = useMemo(() => {
    const dataValues = rawData.map((datum) => datum[yAxis.domainKey] as number);
    const negativeMargins = rawData.map(
      (datum) => datum[errorMargins.negative] as number
    );
    const positiveMargins = rawData.map(
      (datum) => datum[errorMargins.positive] as number
    );
    return getDataMarginBounds(dataValues, negativeMargins, positiveMargins);
  }, [rawData, yAxis.domainKey, errorMargins]);

  const xScale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        direction: Direction.HORIZONTAL,
        domainKey: horizontalAxis.domainKey,
        nice: horizontalAxis.nice || 0,
        reverse: isRTL,
      }),
    [isRTL, horizontalAxis]
  );
  const yScale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        direction: Direction.VERTICAL,
        domainKey: verticalAxis.domainKey,
        nice: verticalAxis.nice || 0,
        minPadding: lowsestMarginValue,
        maxPadding: highestMarginValue,
      }),
    [verticalAxis, lowsestMarginValue, highestMarginValue]
  );

  return (
    <Chart
      dimensions={dimensions}
      rawData={rawData}
      scales={[xScale, yScale]}
      padding={padding}
      colors={[line.stroke]}
      animationOptions={animationOptions}
      scopedSlots={scopedSlots}
    >
      <Grid
        directions={grid.directions}
        color={grid.color}
        xScale={xScale}
        yScale={yScale}
      />
      <Points
        xScale={xScale}
        yScale={yScale}
        scopedSlots={{
          default: ({ scaledData }) => {
            const lineAreaData = scaledData.map((d, idx) => {
              const rawDatum: RawDatum = rawData[idx];
              return {
                x: d.x,
                // @todo error margin data must be scaled
                y0: yScale.scale(
                  (rawDatum[yAxis.domainKey] as number) *
                    (1 - Number(rawDatum[errorMargins.negative]))
                ),
                y1: yScale.scale(
                  (rawDatum[yAxis.domainKey] as number) *
                    (1 + Number(rawDatum[errorMargins.positive]))
                ),
              };
            });
            return (
              <g className="ez-line-error-margin">
                <Area
                  shapeData={lineAreaData as AreaData}
                  curve={line.curve as AreaCurve}
                  beta={line.beta}
                  fill={area.fill}
                />
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
        position={horizontalAxis.position || Position.BOTTOM}
        aScale={xScale}
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
        aScale={yScale}
        title={verticalAxis.title}
        titleAlign={verticalAxis.titleAlign}
        tickLength={verticalAxis.tickLength}
        tickCount={verticalAxis.tickCount}
        tickSize={verticalAxis.tickLength}
        tickFormat={verticalAxis.tickFormat}
      />
    </Chart>
  );
};
