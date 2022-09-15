import React, { FC, SVGAttributes, useMemo } from 'react';
import { LineData, LineCurve } from '@ez/core/src/types';
import { defaultColor, generateLinePath } from '@ez/core/src';
import { useAnimation } from '../../lib/use-animation';
import { useChart } from '@/lib/use-chart';

export interface LineProps extends SVGAttributes<SVGPathElement> {
  shapeData?: LineData;
  curve?: LineCurve;
  beta?: number;
}

export const Line: FC<LineProps> = ({
  shapeData = [],
  curve = 'curveLinear',
  beta,
  stroke = defaultColor,
  strokeWidth = 1,
  ...rest
}) => {
  const { animationOptions } = useChart();
  const dataPath = useMemo(
    () => generateLinePath(shapeData, curve, beta),
    [shapeData, curve, beta]
  );
  const currentData =
    useAnimation(dataPath, '', animationOptions, [curve]) || '';
  return (
    <path
      d={currentData}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinejoin={'round'}
      strokeLinecap={'round'}
      {...rest}
      className="ez-line"
    />
  );
};
