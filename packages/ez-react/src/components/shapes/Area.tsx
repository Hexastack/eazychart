import React, { FC, SVGAttributes, useMemo } from 'react';
import { AreaCurve, AreaData } from '@ez/core/src/types';
import { defaultColor, generateAreaPath } from '@ez/core/src';
import { useAnimation } from '../../lib/use-animation';
import { useChart } from '@/lib/use-chart';

export interface AreaProps extends SVGAttributes<SVGPathElement> {
  shapeData?: AreaData;
  curve?: AreaCurve;
  beta?: number;
}

export const Area: FC<AreaProps> = ({
  shapeData = [],
  curve = 'curveLinear',
  beta,
  fill = defaultColor,
  ...rest
}) => {
  const { animationOptions } = useChart();
  const dataPath = useMemo(
    () => generateAreaPath(shapeData, curve, beta),
    [shapeData, curve, beta]
  );
  const currentData =
    useAnimation(dataPath, '', animationOptions, [curve]) || '';
  return (
    <path
      d={currentData}
      stroke={'none'}
      strokeWidth={0}
      fill={fill}
      strokeLinejoin={'round'}
      strokeLinecap={'round'}
      {...rest}
      className="ez-area"
    />
  );
};
