import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { NormalizedDatum, Point, ShapeDatum } from 'eazychart-core/src/types';
import { debounce } from 'eazychart-core/src';
import { Fragment } from '@/lib/Fragment';
import { useChart } from '@/lib/use-chart';
import { TooltipProps } from './Tooltip';
import { TooltipContext } from './TooltipContext';

export interface TooltipProviderProps {
  Tooltip?: FC<TooltipProps>;
  children: React.ReactNode;
  isWrapped?: boolean;
}

export const TooltipProvider: FC<TooltipProviderProps> = ({
  Tooltip,
  children,
  isWrapped = true,
}) => {
  const { dataDict, dimensions } = useChart();
  const [isVisible, setIsVisible] = useState(false);
  const [datum, setDatum] = useState<NormalizedDatum | null>(null);
  const [shapeDatum, setShapeDatum] = useState<ShapeDatum | null>(null);
  const [mousePosition, setMousePosition] = useState<Point>({ x: 0, y: 0 });

  useEffect(() => {
    setMousePosition({ x: dimensions.width / 2, y: dimensions.height / 2 });
  }, [dimensions]);

  const showTooltip = useCallback(
    (shapeDatum: ShapeDatum, _event: MouseEvent) => {
      const d = shapeDatum.id in dataDict ? dataDict[shapeDatum.id] : null;
      setDatum(d);
      setShapeDatum(shapeDatum);
      setIsVisible(true);
    },
    [dataDict, setDatum, setShapeDatum, setIsVisible]
  );

  const moveTooltip = useMemo(
    () =>
      debounce((_shapeDatum: ShapeDatum, event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      }, 50),
    [setMousePosition]
  );

  const hideTooltip = useCallback(
    (_shapeDatum: ShapeDatum, _event: MouseEvent) => {
      setIsVisible(false);
    },
    [setIsVisible]
  );

  const tooltipProps = {
    datum,
    shapeDatum,
    isVisible,
    mousePosition,
  };

  const TooltipOverride = Tooltip ? <Tooltip {...tooltipProps} /> : null;
  return (
    <TooltipContext.Provider
      value={{
        showTooltip,
        moveTooltip,
        hideTooltip,
      }}
    >
      {isWrapped ? (
        <Fragment type="div" name="tooltip">
          {children}
          {TooltipOverride}
        </Fragment>
      ) : (
        <>
          {children}
          {TooltipOverride}
        </>
      )}
    </TooltipContext.Provider>
  );
};
