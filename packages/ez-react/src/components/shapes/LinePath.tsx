import React, {
  FC,
  SVGAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { LineData, LineCurve } from 'eazychart-core/src/types';
import { defaultColor, generateLinePath } from 'eazychart-core/src';
import { useChart } from '@/lib/use-chart';

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
  fill = 'none',
  strokeLinejoin = 'round',
  strokeLinecap = 'round',
  children,
  ...rest
}) => {
  const {
    animationOptions: { duration },
  } = useChart();
  const dataPath = useMemo(
    () => generateLinePath(shapeData, curve, beta),
    [shapeData, curve, beta]
  );
  const [pathLength, setPathLength] = useState(0);
  const ref = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setPathLength(ref.current.getTotalLength());
    }
  }, [dataPath]);

  return (
    <path
      ref={ref}
      d={dataPath}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeLinejoin={strokeLinejoin}
      strokeLinecap={strokeLinecap}
      {...rest}
      className="ez-line"
    >
      {children ? (
        children
      ) : (
        <>
          <animate
            attributeName="stroke-dasharray"
            attributeType="CSS"
            from={pathLength}
            to={pathLength}
            dur={'0s'}
          />
          <animate
            attributeName="stroke-dashoffset"
            attributeType="CSS"
            from={pathLength}
            to={0}
            dur={`${duration}ms`}
          />
        </>
      )}
    </path>
  );
};
