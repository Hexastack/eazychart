import React, { FC, useEffect, useState } from 'react';
import { Dimensions } from 'eazychart-core/src/types';
import { debounce, defaultChartDimensions } from 'eazychart-core/src';
import { ResponsiveChartContext } from '@/lib/use-responsive-chart';

export type ResponsiveChartContainerProps = {
  onResize?: (dimensions: Dimensions) => void;
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
      // We set the dimensions as provided in the props. Otherwise, we set the parent dimensions.
      // At last, if width / height are equal to zero we default the dimensions
      // so that the end-user would be able to see the chart.
      const newDimensions = {
        width:
          containerDimensions?.width ||
          Math.floor(entry.contentRect.width) ||
          defaultChartDimensions.width,
        height:
          containerDimensions?.height ||
          Math.floor(entry.contentRect.height) ||
          defaultChartDimensions.height,
      };
      setContainerDimensions(newDimensions);
      onResize && onResize(newDimensions);
    });
  };

  // If dimensions prop is provided, we force the values
  useEffect(() => {
    const newDimensions = {
      width: containerDimensions.width,
      height: containerDimensions.height,
    };
    setContainerDimensions(newDimensions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div style={{ width: '100%', height: '100%' }} ref={containerRef}>
        {children}
      </div>
    </ResponsiveChartContext.Provider>
  );
};
