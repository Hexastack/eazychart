import React, { FC } from 'react';
import { defaultPointDatum } from '@ez/core/src';
import { Point, PointProps } from './Point';

export interface BubbleProps extends PointProps {
  fill?: string;
}

export const Bubble: FC<BubbleProps> = ({
  shapeDatum = defaultPointDatum,
  fill,
  ...rest
}) => {
  return (
    <Point
      shapeDatum={shapeDatum}
      key={shapeDatum.id}
      r={shapeDatum.radius}
      fill={fill}
      {...rest}
    />
  );
};
