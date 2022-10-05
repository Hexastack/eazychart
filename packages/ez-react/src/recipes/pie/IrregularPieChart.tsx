import React, { FC, SVGAttributes, useMemo } from 'react';
import {
  Direction,
  RawData,
  AnimationOptions,
  ChartPadding,
  Dimensions,
  PieConfig,
} from 'eazychart-core/src/types';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Legend, LegendPropsWithRef } from '@/components/addons/legend/Legend';
import { ScaleLinear } from 'eazychart-core/src';
import { IrregularArcs } from '@/components/IrregularArcs';

export interface IrregularPieChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  colors?: string[];
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  domainKey?: string;
  arc?: PieConfig;
  dimensions: Partial<Dimensions>;
  scopedSlots?: {
    LegendComponent: React.FC<LegendPropsWithRef>;
    TooltipComponent: React.FC<TooltipProps>;
  };
}

export const IrregularPieChart: FC<IrregularPieChartProps> = ({
  data,
  colors = ['#339999', '#993399', '#333399'],
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
  domainKey = 'value',
  arc = {
    donutRadius: 0,
    cornerRadius: 0,
    padAngle: 0,
    padRadius: 0,
    stroke: '#FFF',
    strokeWidth: 0,
  },
  dimensions = {},
  scopedSlots = {
    LegendComponent: Legend,
    TooltipComponent: Tooltip,
  },
}) => {
  const aScale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        direction: Direction.HORIZONTAL,
        domainKey,
      }),
    [domainKey]
  );
  const rScale = useMemo<ScaleLinear>(
    () =>
      new ScaleLinear({
        direction: Direction.HORIZONTAL,
        domainKey,
      }),
    [domainKey]
  );
  return (
    <Chart
      dimensions={dimensions}
      rawData={data}
      scales={[aScale, rScale]}
      padding={padding}
      colors={colors}
      animationOptions={animationOptions}
      scopedSlots={scopedSlots}
    >
      <IrregularArcs aScale={aScale} rScale={rScale} {...arc} />
    </Chart>
  );
};
