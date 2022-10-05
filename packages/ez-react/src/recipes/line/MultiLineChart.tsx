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
  LineConfig,
  MarkerConfig,
  AxisConfigMulti,
} from 'eazychart-core/src/types';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Axis } from '@/components/scales/Axis';
import { Grid } from '@/components/scales/grid/Grid';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { ColorScale } from '@/components/scales/ColorScale';
import { Legend, LegendProps } from '@/components/addons/legend/Legend';
import { Segments } from '@/components/Segments';
import { useToggableDomainKey } from '@/lib/useToggableDomainKey';

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
    LegendComponent: FC<LegendProps>;
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
    LegendComponent: Legend,
  },
  onResize,
}) => {
  const { activeDomainKeys, activeDomain, toggleDomainKey } =
    useToggableDomainKey(data, yAxis.domainKeys);

  return (
    <Chart
      dimensions={dimensions}
      rawData={data}
      padding={padding}
      animationOptions={animationOptions}
      scopedSlots={scopedSlots}
      onResize={onResize}
      onLegendClick={toggleDomainKey}
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
            domain: activeDomain,
            nice: yAxis.nice || 0,
          },
        }}
      >
        <Grid directions={grid.directions} color={grid.color} />
        <ColorScale domain={yAxis.domainKeys} range={colors}>
          {activeDomainKeys.map((yDomainKey) => {
            return (
              <Segments
                key={yDomainKey}
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
