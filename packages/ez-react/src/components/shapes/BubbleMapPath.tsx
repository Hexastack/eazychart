import React, { FC, SVGAttributes, useMemo } from 'react';
import {
  GeoProjection,
  GeoProjectionType,
  GeoProjectionCenter,
  GeoFeatureDatum,
  centroidsRecord,
} from 'eazychart-core/src/types';
import { defaultColor, generateGeoFeaturePath } from 'eazychart-core/src';
import { useAnimation } from '@/lib/use-animation';
import { useChart } from '@/lib/use-chart';
import { BubbleConfig } from 'eazychart-core/src/utils/types';

export interface BubbleMapPathProps extends SVGAttributes<SVGPathElement> {
  shapeDatum: GeoFeatureDatum;
  projectionType?: GeoProjectionType;
  projection?: GeoProjection;
  projectionCenter: GeoProjectionCenter;
  bubbles: BubbleConfig;
  scopedSlots?: {
    default: ({ shapeDatum }: { shapeDatum: any }) => React.ReactChild;
  };
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
  scopedSlots,
  ...rest
}) => {
  const shapeId = Number(shapeDatum.id);

  const { animationOptions } = useChart();
  const { dataPath } = useMemo(
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

  if (!dataPath) return null;

  return (
    <g>
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
      {scopedSlots && scopedSlots.default ? (
        <g className="ez-bubbles">{scopedSlots.default({ shapeDatum })}</g>
      ) : null}
    </g>
  );
};
