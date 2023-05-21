import React, { FC } from 'react';
import { Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { Pie } from '@/components/Pie';
import { Legend } from '@/components/addons/legend/Legend';
import { PieChartProps } from '@/recipes/pie/PieChart';
import { ColorScale } from '@/components/scales/ColorScale';
import { useToggableDatum } from '@/lib/useToggableDatum';

export type SemiCircleChartProps = PieChartProps;

export const SemiCircleChart: FC<SemiCircleChartProps> = ({
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
          getCenter={({ width, height }) => ({ x: width / 2, y: height })}
          getRadius={({ width, height }) => Math.min(width, height)}
          startAngle={Math.PI / 2}
          endAngle={-Math.PI / 2}
          {...arc}
        />
      </ColorScale>
    </Chart>
  );
};
