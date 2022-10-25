import { Legend, LegendProps } from '@/components/addons/legend/Legend';
import { Tooltip, TooltipProps } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Axis } from '@/components/scales/Axis';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { ColorScale } from '@/components/scales/ColorScale';
import { StackedBars } from '@/components/StackedBars';
import { useToggableDomainKey } from '@/lib/useToggableDomainKey';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src/scales';
import {
  RawData,
  AnimationOptions,
  ChartPadding,
  AxisConfig,
  Position,
  Dimensions,
  Direction,
  AxisConfigMulti,
} from 'eazychart-core/src/types';
import React, { FC, SVGAttributes } from 'react';

export interface StackedColumnChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  colors?: string[];
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  isRTL?: boolean;
  xAxis?: AxisConfig<Position.BOTTOM | Position.TOP>;
  yAxis?: AxisConfigMulti<Position.LEFT | Position.RIGHT>;
  dimensions?: Partial<Dimensions>;
  scopedSlots?: {
    LegendComponent: React.FC<LegendProps>;
    TooltipComponent: React.FC<TooltipProps>;
  };
}

export const StackedColumnChart: FC<StackedColumnChartProps> = ({
  data,
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
  xAxis = {
    domainKey: 'name',
    position: Position.BOTTOM,
  },
  yAxis = {
    domainKeys: ['value', 'value1'],
    position: Position.LEFT,
  },
  isRTL = false,
  dimensions = {},
  scopedSlots = {
    LegendComponent: Legend,
    TooltipComponent: Tooltip,
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
          ScaleClass: ScaleBand,
          definition: {
            domainKey: xAxis.domainKey,
            direction: Direction.HORIZONTAL,
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
        <ColorScale domain={yAxis.domainKeys} range={colors}>
          <StackedBars
            singleDomainKey={xAxis.domainKey}
            multiDomainKeys={activeDomainKeys}
            direction={Direction.VERTICAL}
          />
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
