import { ScaleBand } from 'd3-scale';
import { ArrayOfTwoOrMoreNumbers, D3Scales, StringLike } from '../scales/types';
import { Anchor, Point, Position } from '../types';
import {
  AxisTicks,
  AxisTick,
  AxisTickLine,
  AxisTickText,
  AxisTimeInterval,
  tickFormater,
  tickArgs,
} from './types';

const identity = (t: unknown) => t;

const translateX = (x: number): Point => ({ x, y: 0 });
const translateY = (y: number): Point => ({ x: 0, y });

const toNumber =
  (scale: D3Scales): ((d: any) => number) =>
  (d) =>
    +(scale(d) as number);

const toCenter = (
  scale: ScaleBand<StringLike>,
  offset: number
): ((d: StringLike) => number) => {
  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
  if (scale.round()) offset = Math.round(offset);
  return (d) => +(scale(d) || 0) + offset;
};

class Axis extends Function {
  private sign!: 1 | -1;
  private absisOrdinat!: 'x' | 'y';
  private transform!: (x: number) => Point;

  private orient = Position.LEFT;
  private scaleFn!: D3Scales;

  constructor(orient: Position, scale: D3Scales) {
    super();
    if (Object.values(Position).includes(orient)) {
      this.orient = orient;
    }
    this.scaleFn = scale;
    this.sign =
      this.orient === Position.TOP || this.orient === Position.LEFT
        ? -1
        : 1;
    this.absisOrdinat =
      this.orient === Position.LEFT || this.orient === Position.RIGHT
        ? 'x'
        : 'y';
    this.transform =
      this.orient === Position.TOP || this.orient === Position.BOTTOM
        ? translateX
        : translateY;
  }

  private _tickArguments: tickArgs = [];
  private _tickValues: any[] | null = null;
  private _tickFormat: tickFormater | null = null;
  private _tickSizeInner = 6;
  private _tickSizeOuter = 6;
  private _tickPadding = 3;
  private _offset =
    typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5;

  private generateTicks(
    value: any,
    spacing: number,
    position: (d: any) => number,
    formatFn: any
  ): AxisTick {
    const line: AxisTickLine = {};
    const text: AxisTickText = {
      dy:
        this.orient === Position.TOP
          ? 0
          : this.orient === Position.BOTTOM
          ? 0.6
          : 0.3,
      text: formatFn(value),
    };
    line[(this.absisOrdinat + '2') as 'x2' | 'y2'] =
      this.sign * this._tickSizeInner;
    text[this.absisOrdinat] = this.sign * spacing;

    return {
      transform: this.transform(position(value) + this._offset),
      line: line,
      text: text,
    };
  }

  public axis(): AxisTicks {
    let values: any[] | null = this._tickValues;
    if (values == null) {
      if ('ticks' in this.scaleFn) {
        values = (this.scaleFn.ticks as (count?: number) => number[]).apply(
          this.scaleFn,
          this._tickArguments as [number]
        );
      } else {
        values = this.scaleFn.domain();
      }
    }

    let format = this._tickFormat;
    if (format == null) {
      if ('tickFormat' in this.scaleFn) {
        format = this.scaleFn.tickFormat.apply(
          this.scaleFn,
          this._tickArguments
        );
      } else {
        format = identity;
      }
    }

    let position!: (d: any) => number;
    if ('bandwidth' in this.scaleFn) {
      position = toCenter(
        this.scaleFn.copy() as ScaleBand<StringLike>,
        this._offset
      );
    } else {
      position = toNumber(this.scaleFn.copy());
    }

    const spacing = Math.max(this._tickSizeInner, 0) + this._tickPadding;
    const range = this.scaleFn.range() as ArrayOfTwoOrMoreNumbers;
    const range0 = +range[0] + this._offset;
    const range1 = +range[range.length - 1] + this._offset;

    const ticks = values.map((value) =>
      this.generateTicks(value, spacing, position, format)
    );

    return {
      anchor:
        this.orient === Position.RIGHT
          ? Anchor.START
          : this.orient === Position.LEFT
          ? Anchor.END
          : Anchor.MIDDLE,
      path: {
        tick: this.sign * this._tickSizeOuter,
        range0: range0,
        range1: range1,
      },
      ticks: ticks,
    };
  }

  public orientation(): Position;
  public orientation(orient: Position): this;
  public orientation(_?: Position): Position | this {
    if (_ !== undefined) {
      if (Object.values(Position).includes(_)) {
        this.orient = _;
      }
      return this;
    }
    return this.orient;
  }

  public scale(): D3Scales;
  public scale(scale: D3Scales): this;
  public scale(_?: D3Scales): D3Scales | this {
    return _ !== undefined ? ((this.scaleFn = _), this) : this.scaleFn;
  }

  public ticks(count: number, specifier?: string): this;
  public ticks(interval: AxisTimeInterval, specifier?: string): this;
  public ticks(...args: any[]) {
    // eslint-disable-next-line no-sequences
    return (this._tickArguments = Array.from(args) as tickArgs), this;
  }

  public tickArguments(): tickArgs;
  public tickArguments(tickArguments: tickArgs | null): this;
  public tickArguments(_?: tickArgs | null): any[] | this {
    return _ !== undefined
      ? ((this._tickArguments = _ == null ? [] : (Array.from(_) as tickArgs)),
        this)
      : this._tickArguments.slice();
  }

  public tickValues(): any[];
  public tickValues(values: any[] | null): this;
  public tickValues(_?: any[] | null): any[] | null | this {
    return _ !== undefined
      ? ((this._tickValues = _ == null ? null : Array.from(_)), this)
      : this._tickValues && this._tickValues.slice();
  }

  public tickFormat(): tickFormater;
  public tickFormat(format: tickFormater): this;
  public tickFormat(_?: tickFormater): tickFormater | null | this {
    return _ !== undefined ? ((this._tickFormat = _), this) : this._tickFormat;
  }

  public tickSize(): number;
  public tickSize(size: number): this;
  public tickSize(_?: number): number | this {
    return _ !== undefined
      ? ((this._tickSizeInner = this._tickSizeOuter = +_), this)
      : this._tickSizeInner;
  }

  public tickSizeInner(): number;
  public tickSizeInner(size: number): this;
  public tickSizeInner(_?: number): number | this {
    return _ !== undefined
      ? ((this._tickSizeInner = +_), this)
      : this._tickSizeInner;
  }

  public tickSizeOuter(): number;
  public tickSizeOuter(size: number): this;
  public tickSizeOuter(_?: number): number | this {
    return _ !== undefined
      ? ((this._tickSizeOuter = +_), this)
      : this._tickSizeOuter;
  }

  public tickPadding(): number;
  public tickPadding(size: number): this;
  public tickPadding(_?: number): number | this {
    return _ !== undefined
      ? ((this._tickPadding = +_), this)
      : this._tickPadding;
  }

  public offset(): number;
  public offset(size: number): this;
  public offset(_?: number): number | this {
    return _ !== undefined ? ((this._offset = +_), this) : this._offset;
  }
}

export default Axis;
