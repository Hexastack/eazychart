import React, { FC, SVGAttributes, useCallback, useMemo, useRef } from 'react';
import {
  AxisTickConfig,
  AxisTitleConfig,
  Anchor,
  Position,
  AxisTick,
  AxisData,
} from 'eazychart-core/src/types';
import {
  getAxis,
  getAxisTickByCoordinate,
  getAxisPath,
  transformTranslate,
  getTickTextAnchorByPosition,
  defaultAxis,
  getAxisTitleProps,
  getAxisLabelAttributes,
  ScaleLinear,
  ScaleBand,
} from 'eazychart-core/src';
import { useAnimation } from '@/lib/use-animation';
import { useChart } from '@/lib/use-chart';

export interface AxisProps
  extends SVGAttributes<SVGRectElement>,
    AxisTickConfig,
    AxisTitleConfig {
  position?: Position;
  aScale: ScaleBand | ScaleLinear;
  tickLength?: number;
}

export const Axis: FC<AxisProps> = ({
  position = Position.LEFT,
  aScale,
  tickLength = 1,
  tickCount = 10,
  tickSize = 6,
  tickFormat,
  title,
  titleAlign = Anchor.MIDDLE,
}) => {
  const labelsRef = useRef<Array<SVGTextElement | null>>([]);
  const { dimensions, animationOptions, padding } = useChart();
  const targetAxis = useMemo(() => {
    return getAxis(position, aScale.scale, dimensions, {
      tickCount,
      tickSize,
      tickFormat,
    });
  }, [position, dimensions, aScale.scale, tickCount, tickSize, tickFormat]);

  const currentAxis = useAnimation<AxisData>(
    targetAxis,
    defaultAxis,
    animationOptions
  );

  const getTick = useCallback(
    (tick: number) => getAxisTickByCoordinate(tick, tickLength),
    [tickLength]
  );

  const axisPath = useMemo(
    () => getAxisPath(currentAxis.path, position),
    [currentAxis, position]
  );

  const textAnchor = getTickTextAnchorByPosition(position);

  const currentAxisTransform = useMemo(
    () =>
      transformTranslate({
        x: currentAxis.x,
        y: currentAxis.y,
      }),
    [currentAxis]
  );

  const axisLabelTransform = useMemo(() => {
    const labels = labelsRef.current.filter((el) => !!el) as SVGTextElement[];
    return getAxisLabelAttributes(aScale.scale, labels, position, 'auto');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAxis]);

  const titleProps = useMemo(() => {
    return getAxisTitleProps(position, dimensions, padding, titleAlign);
  }, [position, dimensions, padding, titleAlign]);

  return (
    <g
      textAnchor={textAnchor}
      transform={currentAxisTransform}
      className="ez-axis"
    >
      <path d={axisPath} className="ez-axis-path"></path>
      {currentAxis.ticks
        .filter((tick: AxisTick) => tick.text.text !== undefined)
        .map((tick: AxisTick, index: number) => {
          return (
            <g
              key={index}
              transform={transformTranslate(tick.transform)}
              className="ez-axis-tick"
            >
              <line
                x2={getTick(tick.line.x2 || 0)}
                y2={getTick(tick.line.y2 || 0)}
                className="ez-axis-tick-line"
              />
              <text
                x={tick.text.x}
                y={tick.text.y}
                dy={`${tick.text.dy}em`}
                textAnchor={axisLabelTransform.textAnchor}
                transform={axisLabelTransform.transform}
                className="ez-axis-tick-text"
                ref={(el) => (labelsRef.current[index] = el)}
              >
                {tick.text.text.replace(/(\.\d{1}).*$/, (_a, c) => c)}
              </text>
            </g>
          );
        })}
      {title && (
        <text
          {...titleProps}
          alignmentBaseline={'middle'}
          className="ez-axis-title"
        >
          {title}
        </text>
      )}
    </g>
  );
};
