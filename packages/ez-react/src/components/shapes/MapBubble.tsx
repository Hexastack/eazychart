import React, { FC, MouseEventHandler, SVGAttributes, useMemo } from 'react';
import { GeoFeatureDatum, centroidsRecord } from 'eazychart-core/src/types';
import {
  defaultPointDatum,
  defaultPointRadius,
  generateGeoFeaturePath,
  scaler,
} from 'eazychart-core/src';
import { useAnimation } from '@/lib/use-animation';
import { useTooltip } from '@/components/addons/tooltip/use-tooltip';
import { useChart } from '@/lib/use-chart';

export interface MapBubbleProps extends SVGAttributes<SVGCircleElement> {
  shapeDatum: GeoFeatureDatum;
  projectionType: any;
  projectionCenter: any;
  bubbles: any;
}

export const MapBubble: FC<MapBubbleProps> = ({
  shapeDatum = defaultPointDatum,
  r = defaultPointRadius,
  fill,
  projectionType,
  projectionCenter,
  bubbles = {
    minRange: 0,
    maxRange: 30,
    opacity: 0.8,
    fill: 'orange',
    stroke: 'black',
  },
  stroke,
  strokeWidth = 1,
  ...rest
}) => {
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();
  const { animationOptions, data } = useChart();
  const currentShapeDatum = useAnimation(
    shapeDatum,
    defaultPointDatum,
    animationOptions
  ) as GeoFeatureDatum;
  const shapeId = Number(shapeDatum.id);
  const { centroids } = useMemo(
    () =>
      generateGeoFeaturePath(
        currentShapeDatum,
        projectionType,
        projectionCenter,
        shapeId
      ),
    [currentShapeDatum, projectionType, projectionCenter, shapeId]
  ) as { dataPath: string | null; centroids: centroidsRecord };

  const handleMouseOver: MouseEventHandler<SVGCircleElement> = (event) => {
    showTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleMouseMove: MouseEventHandler<SVGCircleElement> = (event) => {
    moveTooltip(shapeDatum, event as any as MouseEvent);
  };

  const handleMouseLeave: MouseEventHandler<SVGCircleElement> = (event) => {
    hideTooltip(shapeDatum, event as any as MouseEvent);
  };

  // Returns the feature value if it exists
  const getValueById = (id: number): number => {
    const featureData = data.find(
      (featureData) => Number(featureData.id) === id
    );
    return (featureData ? featureData.value : 0) as number;
  };

  return (
    <circle
      stroke={bubbles.stroke}
      fill={shapeDatum.color || bubbles.fill}
      r={scaler(bubbles.minRange, bubbles.maxRange, getValueById(shapeId))}
      cx={centroids[shapeId]?.x}
      cy={centroids[shapeId]?.y}
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      opacity={bubbles.opacity}
      {...rest}
      strokeWidth={1}
      data-testid="ez-point"
      className="ez-point"
    />
  );
};
