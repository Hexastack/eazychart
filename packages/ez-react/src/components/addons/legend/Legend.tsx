import React, { DOMAttributes, useEffect, useState } from 'react';
import { useChart } from '@/lib/use-chart';
import { LegendItem } from '@/components/addons/legend/LegendItem';

export interface LegendProps extends DOMAttributes<HTMLDivElement> {
  onLegendClick?: (key: string, isActive: boolean, color: string) => void;
}

export type LegendPropsWithRef = LegendProps &
  React.RefAttributes<HTMLDivElement>;

export const Legend: React.FC<LegendPropsWithRef> = React.forwardRef<
  HTMLDivElement,
  LegendProps
>(({ onLegendClick, ...rest }, ref) => {
  const { getScale } = useChart();
  const colorScale = getScale('colorScale');
  const [keyDict, setKeyDict] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (colorScale) {
      const dict = colorScale.scale.domain().reduce((map, domainKey) => {
        return {
          ...map,
          [domainKey]: colorScale.scale(domainKey),
        };
      }, {});
      setKeyDict(dict);
    }
  }, [colorScale]);

  return (
    <div className="ez-legend" {...rest} ref={ref}>
      {Object.entries(keyDict).map(([key, color]) => {
        return (
          <LegendItem
            key={key}
            onToggle={onLegendClick}
            label={key}
            color={color}
          />
        );
      })}
    </div>
  );
});
