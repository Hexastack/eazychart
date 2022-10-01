import React, { DOMAttributes, FC, useMemo } from 'react';
import {
  defaultTooltipOffset,
  initialTooltipStyle,
  tooltipAnimationOptions,
} from 'eazychart-core/src';
import {
  AnimationOptions,
  NormalizedDatum,
  Point,
  ShapeDatum,
} from 'eazychart-core/src/types';
import { useAnimation } from '@/lib/use-animation';

export interface TooltipProps extends DOMAttributes<HTMLDivElement> {
  offset?: Point;
  datum: NormalizedDatum | null;
  shapeDatum: ShapeDatum | null;
  isVisible: boolean;
  mousePosition: Point;
  animationOptions?: AnimationOptions;
}

export const Tooltip: FC<TooltipProps> = ({
  offset = defaultTooltipOffset,
  datum,
  shapeDatum,
  isVisible,
  mousePosition,
  animationOptions = tooltipAnimationOptions,
  ...rest
}) => {
  const targetStyle = useMemo(
    () => ({
      left: `${mousePosition.x ? mousePosition.x + offset.x : 0}px`,
      top: `${mousePosition.y ? mousePosition.y + offset.y : 0}px`,
      opacity: isVisible ? 1.0 : 0.0,
    }),
    [mousePosition, isVisible, offset]
  );

  const animatedStyle = useAnimation<any>(
    targetStyle,
    initialTooltipStyle,
    animationOptions,
    [offset]
  );

  const { id, color, isActive, label, ...attributes } = datum || {};

  return (
    <div className="ez-tooltip" style={animatedStyle} {...rest}>
      {datum ? (
        <>
          <div
            className="ez-tooltip-color"
            style={{ backgroundColor: shapeDatum?.color }}
          ></div>
          <div className="ez-tooltip-text">
            {Object.keys(attributes).map((attribute) => {
              return (
                <div
                  key={attribute}
                  className={`ez-tooltip-attribute ${attribute}`}
                >
                  <div className="ez-tooltip-attribute--name">
                    {attribute} :
                  </div>
                  <div className="ez-tooltip-attribute--value">
                    {datum[attribute] as string}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};
