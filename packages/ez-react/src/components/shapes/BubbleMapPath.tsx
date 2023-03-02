import React, { FC, MouseEventHandler, SVGAttributes, useMemo } from 'react';
import {
  GeoProjection,
  GeoProjectionType,
  GeoProjectionCenter,
  GeoFeatureDatum,
} from 'eazychart-core/src/types';
import {
  scaler,
  defaultColor,
  generateGeoFeaturePath,
} from 'eazychart-core/src';
import { useAnimation } from '@/lib/use-animation';
import { useChart } from '@/lib/use-chart';
import { useTooltip } from '../addons/tooltip/use-tooltip';
import { BubbleConfig } from 'eazychart-core/src/utils/types';

export interface BubbleMapPathProps extends SVGAttributes<SVGPathElement> {
  shapeDatum: GeoFeatureDatum;
  idx: number;
  projectionType?: GeoProjectionType;
  projection?: GeoProjection;
  projectionCenter: GeoProjectionCenter;
  bubbles: BubbleConfig;
}

export const BubbleMapPath: FC<BubbleMapPathProps> = ({
  shapeDatum,
  idx,
  projectionType = 'geoMercator',
  projectionCenter,
  stroke = defaultColor,
  fill = defaultColor,
  strokeWidth = 1,
  bubbles = {
    minRange: 0,
    maxRange: 30,
    opacity: 0.5,
    fill: 'orange',
    stroke: 'black',
  },
  ...rest
}) => {
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();
  const { animationOptions, data } = useChart();

  const { dataPath, centroids } = useMemo(
    () =>
      generateGeoFeaturePath(shapeDatum, projectionType, projectionCenter, idx),
    [shapeDatum, projectionType, projectionCenter, idx]
  ) as { dataPath: string | null; centroids: [] };

  const currentData = useAnimation(dataPath || '', '', animationOptions) || '';

  const handleMouseOver: MouseEventHandler<SVGPathElement> = (event) => {
    showTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleMouseMove: MouseEventHandler<SVGPathElement> = (event) => {
    moveTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleMouseLeave: MouseEventHandler<SVGPathElement> = (event) => {
    hideTooltip(shapeDatum, event as any as MouseEvent);
  };

  if (!dataPath) return null;

  return (
    <>
      <path
        d={currentData}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        strokeLinejoin={'round'}
        strokeLinecap={'round'}
        {...rest}
        className="ez-map-path"
      />
      <circle
        stroke={bubbles.stroke}
        fill={shapeDatum.color || fill}
        r={scaler(
          bubbles.minRange,
          bubbles.maxRange,
          Number(data[Number(shapeDatum.id)].value) || 0
        )}
        cx={centroids[idx][0]}
        cy={centroids[idx][1]}
        onMouseOver={handleMouseOver}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        opacity={bubbles.opacity}
        {...rest}
        strokeWidth={1}
        data-testid="ez-point"
        className="ez-point"
      />
    </>
  );
};
