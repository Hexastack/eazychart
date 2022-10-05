import React, { FC, SVGAttributes } from 'react';
import {
  RawData,
  AnimationOptions,
  ChartPadding,
  Dimensions,
  RadialConfig,
} from 'eazychart-core/src/types';
import { TooltipProps, Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Legend, LegendPropsWithRef } from '@/components/addons/legend/Legend';
import { Arcs } from '@/components/Arcs';
import { LinearScale } from '@/components/scales/LinearScale';
import { ColorScale } from '@/components/scales/ColorScale';
import { useToggableDatum } from '@/lib/useToggableDatum';

export interface RadialChartProps extends SVGAttributes<SVGGElement> {
  data: RawData;
  colors?: string[];
  animationOptions?: AnimationOptions;
  padding?: ChartPadding;
  valueDomainKey?: string;
  labelDomainKey?: string;
  index?: number;
  arc?: RadialConfig;
  dimensions?: Partial<Dimensions>;
  scopedSlots?: {
    LegendComponent: React.FC<LegendPropsWithRef>;
    TooltipComponent: React.FC<TooltipProps>;
  };
  onResize?: (dimensions: Dimensions) => void;
}

export const RadialChart: FC<RadialChartProps> = ({
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
    cornerRadius: 0,
    stroke: '#FFF',
    strokeWidth: 0,
    spacing: 0,
  },
  dimensions = {},
  scopedSlots = {
    LegendComponent: Legend,
    TooltipComponent: Tooltip,
  },
  onResize,
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
      onResize={onResize}
      onLegendClick={toggleDatum}
    >
      <LinearScale domainKey={valueDomainKey} range={[0, Math.PI * 2]}>
        <ColorScale domainKey={labelDomainKey} range={activeColors}>
          <Arcs domainKey={valueDomainKey} {...arc} />
        </ColorScale>
      </LinearScale>
    </Chart>
  );
};
