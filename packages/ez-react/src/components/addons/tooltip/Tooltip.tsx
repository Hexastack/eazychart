import React, { DOMAttributes, FC, useMemo } from 'react';
import {
  AnimationOptions,
  NormalizedDatum,
  Point,
  ShapeDatum,
} from 'eazychart-core/src/types';
import { useAnimation } from '@/lib/use-animation';
import {
  defaultTooltipOffset,
  initialTooltipStyle,
  tooltipAnimationOptions,
} from 'eazychart-core/src';

export interface TooltipProps extends DOMAttributes<HTMLDivElement> {
  offset?: Point;
  datum: NormalizedDatum | null;
  shapeDatum: ShapeDatum | null;
  isVisible: boolean;
  mousePosition: Point;
  domains: string[];
  animationOptions?: AnimationOptions;
}

export const Tooltip: FC<TooltipProps> = ({
  offset = defaultTooltipOffset,
  datum,
  shapeDatum,
  isVisible,
  mousePosition,
  domains,
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

  return (
    <div className="ez-tooltip" style={animatedStyle} {...rest}>
      {datum ? (
        <>
          <div
            className="ez-tooltip-color"
            style={{ backgroundColor: shapeDatum?.color }}
          ></div>
          <div className="ez-tooltip-text">
            {domains.map((domain, index) => {
              return (
                <span key={index} className={`ez-tooltip-domain ${domain}`}>
                  {datum[domain] as string}
                </span>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};
