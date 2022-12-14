import React, { FC, SVGAttributes, useMemo } from 'react';
import { AreaCurve, AreaData } from 'eazychart-core/src/types';
import { defaultColor, generateAreaPath } from 'eazychart-core/src';
import { useAnimation } from '../../lib/use-animation';
import { useChart } from '@/lib/use-chart';

export interface AreaPathProps extends SVGAttributes<SVGPathElement> {
  shapeData?: AreaData;
  curve?: AreaCurve;
  beta?: number;
  stroke?: string;
  strokeWidth?: number;
}

export const AreaPath: FC<AreaPathProps> = ({
  shapeData = [],
  curve = 'curveLinear',
  beta,
  stroke = '#1f77b4',
  strokeWidth = 0,
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
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      opacity={opacity}
      strokeLinejoin={'round'}
      strokeLinecap={'round'}
      {...rest}
      className="ez-area-path"
    />
  );
};
