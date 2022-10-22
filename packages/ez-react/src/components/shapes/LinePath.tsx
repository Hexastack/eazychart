import React, { FC, SVGAttributes, useMemo } from 'react';
import { LineData, LineCurve } from 'eazychart-core/src/types';
import { defaultColor, generateLinePath } from 'eazychart-core/src';

export interface LinePathProps extends SVGAttributes<SVGPathElement> {
  shapeData?: LineData;
  curve?: LineCurve;
  beta?: number;
}

export const LinePath: FC<LinePathProps> = ({
  shapeData = [],
  curve = 'curveLinear',
  beta,
  stroke = defaultColor,
  strokeWidth = 1,
  ...rest
}) => {
  const dataPath = useMemo(
    () => generateLinePath(shapeData, curve, beta),
    [shapeData, curve, beta]
  );
  return (
    <path
      d={dataPath}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinejoin={'round'}
      strokeLinecap={'round'}
      strokeDasharray={1000}
      {...rest}
      className="ez-line"
    >
      <animate
        attributeName="stroke-dashoffset"
        attributeType="CSS"
        from={1000}
        to={0}
        dur={'1s'}
      />
      <animate
        attributeName="stroke-dasharray"
        attributeType="CSS"
        to={1000}
        dur={'2s'}
      />
    </path>
  );
};
