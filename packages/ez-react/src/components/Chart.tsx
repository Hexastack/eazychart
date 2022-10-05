import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  debounce,
  defaultChartAnimationOptions,
  defaultChartDimensions,
  defaultChartPadding,
  normalizeData,
  transformTranslate,
} from 'eazychart-core/src';
import {
  AnimationOptions,
  ChartPadding,
  Dimensions,
  RawData,
  NormalizedDatum,
  AnyScale,
} from 'eazychart-core/src/types';
import { TooltipProvider } from '@/components/addons/tooltip/TooltipProvider';
import { LegendProvider } from '@/components/addons/legend/LegendProvider';
import { ChartContext } from '@/lib/use-chart';
import { Tooltip, TooltipProps } from '@/components/addons/tooltip/Tooltip';
import { LegendPropsWithRef } from '@/components/addons/legend/Legend';

export type ChartProps = {
  padding?: Partial<ChartPadding>;
  dimensions?: Partial<Dimensions>;
  animationOptions?: Partial<AnimationOptions>;
  rawData: RawData;
  scopedSlots?: {
    LegendComponent?: React.FC<LegendPropsWithRef>;
    TooltipComponent?: React.FC<TooltipProps>;
  };
  isRTL?: boolean;
  // Useful props for Jest
  onToggleDatum?: (
    datum: NormalizedDatum,
    newState: boolean,
    idx: number
  ) => void;
  onLegendClick?: (key: string, isActive: boolean, color: string) => void;
  isWrapped?: boolean;
  onResize?: (dimensions: Dimensions) => void;
};

export const Chart: FC<ChartProps> = ({
  dimensions,
  padding = {},
  animationOptions,
  rawData,
  children,
  scopedSlots = { TooltipComponent: Tooltip },
  isRTL = false,
  onLegendClick,
  isWrapped = true,
  onResize,
}) => {
  // Data
  const [dataDict, setDataDict] = useState(normalizeData(rawData));
  // Scales (scales needs to be registered to give them a global scope)
  const [scales, setScales] = useState<{
    [scaleId: string]: AnyScale;
  }>({});

  // Dimensions
  const chartRef = React.createRef<HTMLDivElement>();
  const legendRef = React.useRef<HTMLDivElement | null>(null);
  const [containerDimensions, setContainerDimensions] = useState<Dimensions>({
    width: dimensions?.width || 0,
    height: dimensions?.height || 0,
  });

  const chartPadding: ChartPadding = useMemo(
    () => ({
      ...defaultChartPadding,
      ...padding,
    }),
    [padding]
  );

  const chartDimensions: Dimensions = useMemo(() => {
    const { top, right, bottom, left } = chartPadding;
    const legendHeight = legendRef.current
      ? Math.floor(legendRef.current.clientHeight)
      : 0;
    // It take the container dimensions and subsctract padding and legend height
    return {
      width: containerDimensions.width - left - right,
      height: containerDimensions.height - top - bottom - legendHeight,
    };
  }, [containerDimensions, chartPadding]);

  const containerStyle = useMemo(() => {
    return {
      width: `${containerDimensions.width}px`,
      height: `${containerDimensions.height}px`,
    };
  }, [containerDimensions]);

  const svgStyle = useMemo(() => {
    const legendHeight = legendRef.current
      ? Math.floor(legendRef.current.clientHeight)
      : 0;
    return {
      width: `${containerDimensions.width}px`,
      height: `${containerDimensions.height - legendHeight}px`,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerDimensions, legendRef.current]);

  const chartAnimationOptions: AnimationOptions | undefined =
    animationOptions && {
      ...defaultChartAnimationOptions,
      ...animationOptions,
    };

  const computedTransform = useMemo(() => {
    return transformTranslate({ x: padding.left || 0, y: padding.top || 0 });
  }, [padding]);

  useEffect(() => {
    setDataDict(normalizeData(rawData));
  }, [rawData]);

  const chartData = useMemo(() => {
    const values = Object.values(dataDict);
    return isRTL ? values.reverse() : values;
  }, [dataDict, isRTL]);

  const resizeChart: Function = (entries: ResizeObserverEntry[]) => {
    entries.forEach((entry) => {
      // We set the dimensions as provided in the props. Otherwise, we set the parent dimensions.
      // At last, if width / height are equal to zero we default the dimensions
      // so that the end-user would be able to see the chart.
      const newDimensions = {
        width:
          dimensions?.width ||
          Math.floor(entry.contentRect.width) ||
          defaultChartDimensions.width,
        height:
          dimensions?.height ||
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
      width: dimensions?.width || containerDimensions.width,
      height: dimensions?.height || containerDimensions.height,
    };
    setContainerDimensions(newDimensions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions]);

  // Else, observe chart parent width & height
  useEffect(() => {
    if (!dimensions?.width || !dimensions?.height) {
      // Dimensions values has not been set, we need to observe and resize
      const observer = new ResizeObserver((entries) => {
        debounce(resizeChart(entries), 100);
      });
      observer.observe(chartRef.current?.parentNode as Element, {
        box: 'border-box',
      });
      return () => {
        observer.disconnect();
      };
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helpers to offer some scales a global scope. This is useful to have the legend
  // access the color domain for example. Otherwise, we would need to add a portal
  // which is still experimental in react + does not exist in Vue2.
  const registerScale = (scaleId: string, scale: AnyScale) => {
    setScales({
      ...scales,
      [scaleId]: scale,
    });
  };

  const getScale = (scaleId: string): AnyScale | null => {
    return scaleId in scales ? scales[scaleId] : null;
  };

  return (
    <ChartContext.Provider
      value={{
        dimensions: chartDimensions,
        padding: chartPadding,
        animationOptions: chartAnimationOptions,
        data: chartData,
        dataDict,
        isRTL,
        registerScale,
        getScale,
      }}
    >
      {/*
        When isWrapped is false, we output the shapes without any container.
        This would be useful not only for unit test (snapshot comparison) but
        also to add the ability to combine multiple charts inside one single SVG.
      */}
      {isWrapped ? (
        <div className="ez-viz" style={containerStyle} ref={chartRef}>
          <TooltipProvider Tooltip={scopedSlots?.TooltipComponent}>
            <LegendProvider
              Legend={
                scopedSlots?.LegendComponent && (
                  <scopedSlots.LegendComponent
                    onLegendClick={onLegendClick}
                    ref={legendRef}
                  />
                )
              }
            >
              <div className="ez-chart">
                <svg className="ez-svg" style={svgStyle}>
                  <g transform={computedTransform}>{children}</g>
                </svg>
              </div>
            </LegendProvider>
          </TooltipProvider>
        </div>
      ) : (
        <TooltipProvider
          Tooltip={scopedSlots?.TooltipComponent}
          isWrapped={isWrapped}
        >
          <LegendProvider
            Legend={
              scopedSlots?.LegendComponent && (
                <scopedSlots.LegendComponent
                  onLegendClick={onLegendClick}
                  ref={legendRef}
                />
              )
            }
            isWrapped={isWrapped}
          >
            {children}
          </LegendProvider>
        </TooltipProvider>
      )}
    </ChartContext.Provider>
  );
};
