import React, { FC, useEffect, useState } from 'react';
import { Dimensions } from 'eazychart-core/src/types';
import { debounce, defaultChartDimensions } from 'eazychart-core/src';
import { ResponsiveChartContext } from '@/lib/use-responsive-chart';

export type ResponsiveChartContainerProps = {
  onResize?: (dimensions: Dimensions) => void;
  children: React.ReactNode;
};

export const ResponsiveChartContainer: FC<ResponsiveChartContainerProps> = ({
  children,
  onResize,
}) => {
  // Dimensions
  const containerRef = React.createRef<HTMLDivElement>();
  const [containerDimensions, setContainerDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const resizeChart: Function = (entries: ResizeObserverEntry[]) => {
    entries.forEach((entry) => {
      const newDimensions = {
        width:
          Math.floor(entry.contentRect.width) || defaultChartDimensions.width,
        height:
          Math.floor(entry.contentRect.height) || defaultChartDimensions.height,
      };
      setContainerDimensions(newDimensions);
      onResize && onResize(newDimensions);
    });
  };

  // Else, observe chart parent width & height
  useEffect(() => {
    // Dimensions values has not been set, we need to observe and resize
    const observer = new ResizeObserver((entries) => {
      debounce(resizeChart(entries), 100);
    });
    observer.observe(containerRef.current as Element, {
      box: 'border-box',
    });
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ResponsiveChartContext.Provider
      value={{ dimensions: containerDimensions }}
    >
      <div
        className="ez-responsive-container"
        style={{ width: '100%', height: '100%' }}
        ref={containerRef}
      >
        {children}
      </div>
    </ResponsiveChartContext.Provider>
  );
};
