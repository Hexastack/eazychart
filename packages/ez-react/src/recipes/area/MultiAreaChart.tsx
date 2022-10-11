import { Legend, LegendProps } from '@/components/addons/legend/Legend';
import { Tooltip, TooltipProps } from '@/components/addons/tooltip/Tooltip';
import { Areas } from '@/components/Areas';
import { Chart } from '@/components/Chart';
import { Axis } from '@/components/scales/Axis';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { ColorScale } from '@/components/scales/ColorScale';
import { Grid } from '@/components/scales/grid/Grid';
import { useToggableDomainKey } from '@/lib/useToggableDomainKey';
import ScaleLinear from 'eazychart-core/src/scales/ScaleLinear';
import {
  RawData,
  MarkerConfig,
  AnimationOptions,
  ChartPadding,
  GridConfig,
  AxisConfig,
  Position,
  AxisConfigMulti,
  Dimensions,
  AreaConfig,
  Direction,
} from 'eazychart-core/src/types';
import React, { FC, SVGAttributes } from 'react';

export interface MultiAreaChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  colors?: string[];
  area?: AreaConfig;
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

export const MultiAreaChart: FC<MultiAreaChartProps> = ({
  data,
  colors = ['#339999', '#993399', '#333399'],
  area = {
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
    domainKeys: ['yValue', 'yValue1', 'yValue2'],
  },
  isRTL = false,
  dimensions = {},
  scopedSlots = {
    TooltipComponent: Tooltip,
    LegendComponent: Legend,
  },
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
              <Areas
                key={yDomainKey}
                xDomainKey={xAxis.domainKey}
                yDomainKey={yDomainKey}
                area={area}
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
