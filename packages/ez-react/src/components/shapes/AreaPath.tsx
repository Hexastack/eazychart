import React, { FC, SVGAttributes, useMemo } from 'react';
import { AreaCurve, AreaData } from 'eazychart-core/src/types';
import { defaultColor, generateAreaPath } from 'eazychart-core/src';
import { useAnimation } from '../../lib/use-animation';
import { useChart } from '@/lib/use-chart';

export interface AreaPathProps extends SVGAttributes<SVGPathElement> {
  shapeData?: AreaData;
  curve?: AreaCurve;
  beta?: number;
}

export const AreaPath: FC<AreaPathProps> = ({
  shapeData = [],
  curve = 'curveLinear',
  beta,
  fill = defaultColor,
  opacity = 1,
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
      opacity={opacity}
      strokeLinejoin={'round'}
      strokeLinecap={'round'}
      {...rest}
      className="ez-area"
    />
  );
};
