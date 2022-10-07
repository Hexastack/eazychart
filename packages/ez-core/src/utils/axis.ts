import { AxisData, AxisPath } from '../axis/types';
import { Position, Dimensions, Anchor, Direction } from '../types';
import {
  D3CategoricalScales,
  D3ContuniousScales,
  D3Scales,
} from '../scales/types';
import { ChartPadding, TickOptions } from './types';
import Axis from '../axis';
import { isVerticalPosition } from './grid';

export const textAnchorByPosition = {
  [Position.TOP]: Anchor.MIDDLE,
  [Position.RIGHT]: Anchor.START,
  [Position.BOTTOM]: Anchor.MIDDLE,
  [Position.LEFT]: Anchor.END,
};

export const getTickTextAnchorByPosition = (position: Position) => {
  return textAnchorByPosition[position];
};

export const getAxisPath = (path: AxisPath, position: Position) => {
  // Borrowed from https://github.com/d3/d3-axis/blob/64372b12c9ba5c8a816277b3ad04ff813db5af97/src/axis.js#L91
  const offset =
    typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5;
  if (position === Position.TOP || position === Position.BOTTOM) {
    return `M${path.range0},${path.tick}V${-path.tick}V-${offset}H${
      path.range1
    }V${path.tick}V${-path.tick}`;
  }
  return `M${-path.tick},${path.range0}H${path.tick}H-${offset}V${
    path.range1
  }H${-path.tick},${path.tick}`;
};

export const getAxisTitleProps = (
  position: Position,
  dimensions: Dimensions,
  padding: ChartPadding,
  titleAlign: Anchor
) => {
  if (position === Position.LEFT || position === Position.RIGHT) {
    const x = 0;
    const dy =
      (position === Position.RIGHT ? padding.right : -padding.left) / 2;
    let y = dimensions.height / 2;
    if (titleAlign === 'start') {
      y = dimensions.height;
    } else if (titleAlign === 'end') {
      y = 0;
    }
    return {
      textAnchor: titleAlign,
      transform: `translate(${x},${y}) rotate(-90)`,
      dy,
    };
  } else {
    let x = dimensions.width / 2;
    const y = 0;
    const dy =
      (position === Position.BOTTOM ? padding.bottom : -padding.top) / 2;
    if (titleAlign === 'start') {
      x = 0;
    } else if (titleAlign === 'end') {
      x = dimensions.width;
    }
    return {
      textAnchor: titleAlign,
      transform: `translate(${x},${y})`,
      dy,
    };
  }
};

export const getAxis = (
  position: Position,
  scale: D3Scales,
  dimensions: Dimensions,
  options?: TickOptions
) => {
  const { width, height } = dimensions;
  const axis = new Axis(position, scale);
  if (options?.tickCount) {
    // @ts-ignore
    axis.ticks(options.tickCount);
  }
  if (options?.tickSize) {
    // @ts-ignore
    axis.tickSize(options.tickSize);
  }
  if (typeof options?.tickFormat === 'function') {
    // @ts-ignore
    axis.tickFormat(options.tickFormat);
  }
  const axisData: AxisData = {
    ...axis.axis(),
    x: position === Position.RIGHT ? width : 0,
    y: position === Position.BOTTOM ? height : 0,
  };
  return axisData;
};

export const getGrid = (
  direction: Direction,
  scale: D3Scales,
  dimensions: Dimensions,
  options?: TickOptions
) => {
  return getAxis(
    direction === Direction.HORIZONTAL ? Position.LEFT : Position.BOTTOM,
    scale,
    dimensions,
    options
  );
};

export const getAxisTickByCoordinate = (
  tickCoordinate: number,
  tickLength: number
) => {
  return tickCoordinate * tickLength || 0;
};

const measureAxisLabels = (labels: SVGGraphicsElement[]) => {
  if (labels.length === 0) {
    return {
      maxHeight: 0,
      maxWidth: 0,
      labelCount: 0,
    };
  }

  const boundingBoxes = labels.map((l) => {
    return typeof l.getBBox === 'function'
      ? l.getBBox()
      : { width: 0, height: 0 };
  });
  const maxHeight = Math.max(...boundingBoxes.map((b) => b.height));
  const maxWidth = Math.max(...boundingBoxes.map((b) => b.width));
  return {
    maxHeight,
    maxWidth,
    labelCount: labels.length,
  };
};

const getAxisLabelAnchorByPosition = (position: Position) => {
  switch (position) {
    case Position.TOP:
    case Position.RIGHT:
      return Anchor.START;
    default:
      return Anchor.END;
  }
};

const calculateAxisTickRotation = (
  scale: D3ContuniousScales | D3CategoricalScales,
  labels: SVGGraphicsElement[],
  position: Position,
  rotation: number | 'auto',
  reverse: boolean
) => {
  const { maxHeight, maxWidth, labelCount } = measureAxisLabels(labels);
  const measuredSize = labelCount * maxWidth;
  const sign =
    position === Position.TOP || position === Position.LEFT ? -1 : 1;

  // The more the overlap, the more we rotate
  let rotate: number;
  if (rotation === 'auto' && typeof scale !== 'undefined') {
    const range = scale.range()[reverse ? 0 : 1] as number;
    rotate =
      range < measuredSize
        ? 90 * Math.min(1, (measuredSize / range - 0.8) / 2)
        : 0;
  } else {
    rotate = rotation as number;
  }
  const anchor = getAxisLabelAnchorByPosition(position);
  return {
    rotate: isVerticalPosition(position)
      ? Math.floor(sign * (90 - rotate))
      : Math.floor(-rotate),
    maxHeight,
    maxWidth,
    anchor: rotate > 0 ? anchor : Anchor.MIDDLE,
  };
};

export const getAxisLabelAttributes = (
  scale: D3ContuniousScales | D3CategoricalScales,
  elements: SVGGraphicsElement[],
  position: Position,
  rotation: number | 'auto',
  reverse: boolean
) => {
  const { rotate, maxHeight, anchor } = calculateAxisTickRotation(
    scale,
    elements,
    position,
    rotation,
    reverse
  );
  const sign =
    position === Position.TOP || position === Position.LEFT ? -1 : 1;
  const offset = sign * Math.floor(maxHeight / 2);
  const offsetTransform = isVerticalPosition(position)
    ? `translate(${offset}, 0)`
    : `translate(0, ${offset})`;
  return {
    textAnchor: anchor,
    transform: `${offsetTransform} rotate(${rotate} 0 0)`,
  };
};
