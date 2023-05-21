import React, { FC, SVGAttributes } from 'react';
import {
  RawData,
  AnimationOptions,
  ChartPadding,
  Dimensions,
  PieConfig,
  ShapeClickEventHandler,
} from 'eazychart-core/src/types';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Pie } from '@/components/Pie';
import { Legend, LegendProps } from '@/components/addons/legend/Legend';
import { ColorScale } from '@/components/scales/ColorScale';
import { useToggableDatum } from '@/lib/useToggableDatum';

export interface PieChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  colors?: string[];
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  valueDomainKey?: string;
  labelDomainKey?: string;
  arc?: PieConfig;
  dimensions?: Partial<Dimensions>;
  onShapeClick?: ShapeClickEventHandler;
  scopedSlots?: {
    LegendComponent: React.FC<LegendProps>;
    TooltipComponent: React.FC<TooltipProps>;
  };
}

export const PieChart: FC<PieChartProps> = ({
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
  valueDomainKey = 'value',
  labelDomainKey = 'name',
  arc = {
    donutRadius: 0,
    cornerRadius: 0,
    padAngle: 0,
    padRadius: 0,
    stroke: '#FFF',
    strokeWidth: 0,
  },
  dimensions = {},
  onShapeClick,
  scopedSlots = {
    LegendComponent: Legend,
    TooltipComponent: Tooltip,
  },
}) => {
  const { activeData, activeColors, toggleDatum } = useToggableDatum(
    data,
    labelDomainKey,
    colors
  );

  return (
    <Chart
      dimensions={dimensions}
      rawData={activeData}
      padding={padding}
      animationOptions={animationOptions}
      scopedSlots={scopedSlots}
      onShapeClick={onShapeClick}
      onLegendClick={toggleDatum}
    >
      <ColorScale domainKey={labelDomainKey} range={activeColors}>
        <Pie
          valueDomainKey={valueDomainKey}
          labelDomainKey={labelDomainKey}
          {...arc}
        />
      </ColorScale>
    </Chart>
  );
};
