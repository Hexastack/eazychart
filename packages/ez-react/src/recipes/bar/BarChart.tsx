import React, { FC, SVGAttributes } from 'react';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';
import {
  AnimationOptions,
  AxisConfig,
  ChartPadding,
  Dimensions,
  Direction,
  GridConfig,
  Position,
  RawData,
} from 'eazychart-core/src/types';
import { Axis } from '@/components/scales/Axis';
import { Chart } from '@/components/Chart';
import { Bars } from '@/components/Bars';
import { Legend, LegendProps } from '@/components/addons/legend/Legend';
import { Tooltip, TooltipProps } from '@/components/addons/tooltip/Tooltip';
import { Grid } from '@/components/scales/grid/Grid';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { ColorScale } from '@/components/scales/ColorScale';
import { useToggableDatum } from '@/lib/useToggableDatum';

export interface BarChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  colors?: string[];
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  grid?: GridConfig;
  isRTL?: boolean;
  xAxis?: AxisConfig<Position.BOTTOM | Position.TOP>;
  yAxis?: AxisConfig<Position.LEFT | Position.RIGHT>;
  dimensions?: Partial<Dimensions>;
  scopedSlots?: {
    LegendComponent?: React.FC<LegendProps>;
    TooltipComponent?: FC<TooltipProps>;
  };
}

export const BarChart: FC<BarChartProps> = ({
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
  isRTL = false,
  dimensions = {},
  scopedSlots = {
    LegendComponent: Legend,
    TooltipComponent: Tooltip,
  },
}) => {
  const { activeData, activeColors, toggleDatum } = useToggableDatum(
    data,
    yAxis.domainKey,
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
          ScaleClass: ScaleLinear,
          definition: {
            direction: Direction.HORIZONTAL,
            domainKey: xAxis.domainKey,
            nice: xAxis.nice || 0,
            reverse: isRTL,
          },
        }}
        yScaleConfig={{
          ScaleClass: ScaleBand,
          definition: {
            direction: Direction.VERTICAL,
            domainKey: yAxis.domainKey,
          },
        }}
      >
        <Grid directions={grid.directions} color={grid.color} />
        <ColorScale domainKey={yAxis.domainKey} range={activeColors}>
          <Bars xDomainKey={xAxis.domainKey} yDomainKey={yAxis.domainKey} />
        </ColorScale>
        <Axis {...xAxis} position={xAxis.position || Position.BOTTOM} />
        <Axis
          {...yAxis}
          position={yAxis.position || (isRTL ? Position.RIGHT : Position.LEFT)}
        />
      </CartesianScale>
    </Chart>
  );
};
