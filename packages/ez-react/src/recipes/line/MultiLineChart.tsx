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
  LineConfig,
  MarkerConfig,
  AxisConfigMulti,
  ArrayOfTwoNumbers,
} from 'eazychart-core/src/types';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Axis } from '@/components/scales/Axis';
import { Grid } from '@/components/scales/grid/Grid';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { Segments } from '@/components/Segments';
import { ColorScale } from '@/components/scales/ColorScale';

const getDomainByKeys = (domainKeys: string[], data: RawData) => {
  return domainKeys.reduce(
    ([min, max], domainKey) => {
      const values = data.map((datum) => datum[domainKey] as number);
      return [Math.min(min, ...values), Math.max(max, ...values)];
    },
    [+Infinity, -Infinity] as number[]
  ) as ArrayOfTwoNumbers;
};

export interface MultiLineChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  colors?: string[];
  line?: LineConfig;
  marker?: MarkerConfig;
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  grid?: GridConfig;
  isRTL?: boolean;
  xAxis?: AxisConfig<Position.BOTTOM | Position.TOP>;
  yAxis?: AxisConfigMulti<Position.LEFT | Position.RIGHT>;
  dimensions?: Partial<Dimensions>;
  scopedSlots?: {
    TooltipComponent: FC<TooltipProps>;
  };
  onResize?: (dimensions: Dimensions) => void;
}

export const MultiLineChart: FC<MultiLineChartProps> = ({
  data,
  colors = ['#339999', '#993399', '#333399'],
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
    domainKeys: ['yValue1', 'yValue2'],
  },
  isRTL = false,
  dimensions = {},
  scopedSlots = {
    TooltipComponent: Tooltip,
  },
  onResize,
}) => {
  const yDomain = useMemo(
    () => getDomainByKeys(yAxis.domainKeys, data),
    [yAxis, data]
  );
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
  const yScale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        direction: Direction.VERTICAL,
        domain: yDomain,
        nice: yAxis.nice || 0,
      }),
    [yAxis, yDomain]
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
        <ColorScale domain={yAxis.domainKeys} colors={colors}>
          {yAxis.domainKeys.map((yDomainKey) => {
            return (
              <Segments
                xDomainKey={xAxis.domainKey}
                yDomainKey={yDomainKey}
                line={line}
                marker={marker}
              />
            );
          })}
        </ColorScale>
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
