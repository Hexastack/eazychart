import React, { DOMAttributes, useEffect, useRef, useState } from 'react';
import { useChart } from '@/lib/use-chart';
import { LegendItem } from '@/components/addons/legend/LegendItem';
import { debounce } from 'eazychart-core/src';

export interface LegendProps extends DOMAttributes<HTMLDivElement> {
  onLegendClick?: (key: string, isActive: boolean, color: string) => void;
  onResize?: ({ width, height }: { width: number; height: number }) => void;
}

export const Legend: React.FC<LegendProps> = ({
  onLegendClick,
  onResize,
  ...rest
}) => {
  const { getScale } = useChart();
  const colorScale = getScale('colorScale');
  const [keyDict, setKeyDict] = useState<{
    [key: string]: string;
  }>({});
  const ref = useRef<HTMLDivElement>(null);

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

  const resizeChart: Function = (entries: ResizeObserverEntry[]) => {
    entries.forEach((entry) => {
      const newDimensions = {
        width: Math.floor(entry.contentRect.width),
        height: Math.floor(entry.contentRect.height),
      };
      onResize && onResize(newDimensions);
    });
  };

  // Else, observe chart parent width & height
  useEffect(() => {
    // Dimensions values has not been set, we need to observe and resize
    const observer = new ResizeObserver((entries) => {
      debounce(resizeChart(entries), 100);
    });
    observer.observe(ref?.current as Element, {
      box: 'border-box',
    });
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    ref && (
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
    )
  );
};
