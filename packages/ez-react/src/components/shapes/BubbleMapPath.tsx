import React, { FC, MouseEventHandler, SVGAttributes, useMemo } from 'react';
import {
  GeoProjection,
  GeoProjectionType,
  GeoProjectionCenter,
  GeoFeatureDatum,
  centroidsRecord,
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
import { Point } from './Point';

export interface BubbleMapPathProps extends SVGAttributes<SVGPathElement> {
  shapeDatum: GeoFeatureDatum;
  projectionType?: GeoProjectionType;
  projection?: GeoProjection;
  projectionCenter: GeoProjectionCenter;
  bubbles: BubbleConfig;
}

export const BubbleMapPath: FC<BubbleMapPathProps> = ({
  shapeDatum,
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
  const shapeId = Number(shapeDatum.id);

  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();
  const { animationOptions, data } = useChart();
  const { dataPath, centroids } = useMemo(
    () =>
      generateGeoFeaturePath(
        shapeDatum,
        projectionType,
        projectionCenter,
        shapeId
      ),
    [shapeDatum, projectionType, projectionCenter, shapeId]
  ) as { dataPath: string | null; centroids: centroidsRecord };

  const currentData = useAnimation(dataPath || '', '', animationOptions) || '';
  const animatedCentroids =
    useAnimation(centroids || '', {}, animationOptions) || '';

  const handleMouseOver: MouseEventHandler<SVGPathElement> = (event) => {
    showTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleMouseMove: MouseEventHandler<SVGPathElement> = (event) => {
    moveTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleMouseLeave: MouseEventHandler<SVGPathElement> = (event) => {
    hideTooltip(shapeDatum, event as any as MouseEvent);
  };

  // Returns the feature value if it exists
  const getValueById = (id: number): number => {
    const featureData = data.find(
      (featureData) => Number(featureData.id) === id
    );
    return (featureData ? featureData.value : 0) as number;
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
      <Point
        stroke={bubbles.stroke}
        fill={shapeDatum.color || fill}
        r={scaler(bubbles.minRange, bubbles.maxRange, getValueById(shapeId))}
        cx={animatedCentroids[shapeId]?.x}
        cy={animatedCentroids[shapeId]?.y}
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
