import React, { FC, SVGAttributes, useMemo } from 'react';
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
  ShapeClickEventHandler,
  ScaleLinearDefinition,
} from 'eazychart-core/src/types';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Points } from '@/components/Points';
import { Axis } from '@/components/scales/Axis';
import { Grid } from '@/components/scales/grid/Grid';
import { LinePath } from '@/components/shapes/LinePath';
import { Point } from '@/components/shapes/Point';
import { AreaPath } from '@/components/shapes/AreaPath';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { getDefinedLinearScaleOptions } from '@/recipes/utils/linearScale';

export interface LineErrorMarginChartProps extends SVGAttributes<SVGGElement> {
  line: LineConfig;
  data: RawData;
  area?: Partial<AreaConfig>;
  marker?: MarkerConfig;
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  grid?: GridConfig;
  isRTL?: boolean;
  xAxis?: AxisConfig<Position.BOTTOM | Position.TOP> & ScaleLinearDefinition;
  yAxis?: AxisConfig<Position.LEFT | Position.RIGHT> & ScaleLinearDefinition;
  dimensions?: Partial<Dimensions>;
  errorMargins?: {
    positive: string; // in percent [0..1]
    negative: string; // in percent [0..1]
  };
  onShapeClick?: ShapeClickEventHandler;
  scopedSlots?: {
    TooltipComponent?: FC<TooltipProps>;
  };
}

export const LineErrorMarginChart: FC<LineErrorMarginChartProps> = ({
  data,
  line = {
    stroke: '#339999',
    strokeWidth: 2,
    curve: 'curveBasis',
  },
  area = {
    fill: '#ef476f80',
    stroke: '#339999',
    strokeWidth: 0,
    opacity: 1,
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
  onShapeClick,
  scopedSlots = {
    TooltipComponent: Tooltip,
  },
}) => {
  const [lowsestMarginValue, highestMarginValue] = useMemo(() => {
    const dataValues = data.map((datum) => datum[yAxis.domainKey] as number);
    const negativeMargins = data.map(
      (datum) => datum[errorMargins.negative] as number
    );
    const positiveMargins = data.map(
      (datum) => datum[errorMargins.positive] as number
    );
    return getDataMarginBounds(dataValues, negativeMargins, positiveMargins);
  }, [data, yAxis.domainKey, errorMargins]);

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
            ...getDefinedLinearScaleOptions(xAxis),
          },
        }}
        yScaleConfig={{
          ScaleClass: ScaleLinear,
          definition: {
            direction: Direction.VERTICAL,
            domainKey: yAxis.domainKey,
            nice: yAxis.nice || 0,
            minPadding: lowsestMarginValue,
            maxPadding: highestMarginValue,
            ...getDefinedLinearScaleOptions(yAxis, [
              'maxPadding',
              'minPadding',
            ]),
          },
        }}
      >
        <Grid directions={grid.directions} color={grid.color} />
        <Points
          xDomainKey={xAxis.domainKey}
          yDomainKey={yAxis.domainKey}
          scopedSlots={{
            default: ({ shapeData, scales: { yScale } }) => {
              const lineAreaData = shapeData.map((d, idx) => {
                const datum: RawDatum = data[idx];
                return {
                  x: d.x,
                  // @todo error margin data must be scaled
                  y0: yScale.scale(
                    (datum[yAxis.domainKey] as number) *
                      (1 - Number(datum[errorMargins.negative]))
                  ),
                  y1: yScale.scale(
                    (datum[yAxis.domainKey] as number) *
                      (1 + Number(datum[errorMargins.positive]))
                  ),
                };
              });
              return (
                <g className="ez-line-error-margin">
                  <AreaPath
                    shapeData={lineAreaData as AreaData}
                    curve={line.curve as AreaCurve}
                    beta={line.beta}
                    fill={area.fill}
                    stroke={area.stroke}
                    strokeWidth={area.strokeWidth}
                    opacity={area.opacity}
                  />
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
                          fill={marker.color}
                          stroke={line.stroke}
                          strokeWidth={line.strokeWidth}
                        />
                      );
                    })}
                </g>
              );
            },
          }}
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
