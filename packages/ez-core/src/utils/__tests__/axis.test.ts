import { ScaleLinear } from '../../scales';
import { Direction, Position } from '../../types';
import { getAxis, getAxisPath } from '../axis';

describe('getAxisPath', () => {
  it('returns an horizontal axis path', () => {
    const position = Position.BOTTOM;
    const dimensions = { width: 800, height: 600 };
    const linear = new ScaleLinear({ direction: Direction.HORIZONTAL });
    linear.computeScale(dimensions, [{ x: 1 }, { x: 5 }, { x: 10 }]);
    const axis = getAxis(position, linear.scale, dimensions);
    expect(getAxisPath(axis.path, position)).toMatchInlineSnapshot(
      '"M0.5,6V-6V-0.5H800.5V6V-6"'
    );
  });

  it('returns a vertical axis path', () => {
    const position = Position.RIGHT;
    const dimensions = { width: 800, height: 600 };
    const linear = new ScaleLinear({ direction: Direction.VERTICAL });
    linear.computeScale(dimensions, [{ x: 1 }, { x: 5 }, { x: 10 }]);
    const axis = getAxis(position, linear.scale, dimensions);
    expect(getAxisPath(axis.path, position)).toMatchInlineSnapshot(
      '"M-6,600.5H6H-0.5V0.5H-6,6"'
    );
  });
});

describe('getAxis', () => {
  it('returns the requested vertical axis', () => {
    const position = Position.LEFT;
    const dimensions = { width: 400, height: 300 };
    const linear = new ScaleLinear({
      direction: Direction.VERTICAL,
      domainKey: 'x',
      roundRange: true,
    });
    linear.computeScale(dimensions, [{ x: 0 }, { x: 50 }, { x: 100 }]);
    expect(getAxis(position, linear.scale, dimensions)).toMatchSnapshot();
  });

  it('returns the requested horizontal axis', () => {
    const position = Position.BOTTOM;
    const dimensions = { width: 400, height: 300 };
    const linear = new ScaleLinear({
      direction: Direction.HORIZONTAL,
      domainKey: 'x',
      roundRange: true,
    });
    linear.computeScale(dimensions, [{ x: 0 }, { x: 50 }, { x: 100 }]);
    expect(getAxis(position, linear.scale, dimensions)).toMatchSnapshot();
  });
});
