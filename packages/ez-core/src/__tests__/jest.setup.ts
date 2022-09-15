import diff from 'jest-diff';

expect.extend({
  toBeCloseTo(received: number, expected: number, order = -6) {
    const digitsOrDecimals = order < 0 ? 'decimals' : 'degits';
    const options = {
      comment: `Number ${order} ${digitsOrDecimals} close to`,
      isNot: this.isNot,
      promise: this.promise,
    };

    const pass = Math.abs(received - expected) < Math.pow(10, order);

    const message = pass
      ? () =>
          // eslint-disable-next-line prefer-template
          this.utils.matcherHint('toBecloseTo', undefined, undefined, options) +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(received)}`
      : () => {
          const diffString = diff(expected, received, {
            expand: this.expand,
          });
          return (
            // eslint-disable-next-line prefer-template
            this.utils.matcherHint(
              'toBecloseTo',
              undefined,
              undefined,
              options
            ) +
            '\n\n' +
            (diffString && diffString.includes('- Expect')
              ? `Difference:\n\n${diffString}`
              : `Expected: ${this.utils.printExpected(expected)}\n` +
                `Received: ${this.utils.printReceived(received)}`)
          );
        };

    return { actual: received, message, pass };
  },

  toBeType(received: string, expected: string) {
    const initialType = typeof received;
    const options = {
      comment: `Type ${expected} to be of type`,
      isNot: this.isNot,
      promise: this.promise,
    };
    const type =
      initialType === 'object'
        ? Array.isArray(received)
          ? 'array'
          : initialType
        : initialType;

    const pass = type === expected;

    const message = pass
      ? () =>
          // eslint-disable-next-line prefer-template
          this.utils.matcherHint('toBeType', undefined, undefined, options) +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(received)}`
      : () => {
          const diffString = diff(expected, received, {
            expand: this.expand,
          });
          return (
            // eslint-disable-next-line prefer-template
            this.utils.matcherHint(
              'toBeType',
              undefined,
              undefined,
              options
            ) +
            '\n\n' +
            (diffString && diffString.includes('- Expect')
              ? `Difference:\n\n${diffString}`
              : `Expected: ${this.utils.printExpected(expected)}\n` +
                `Received: ${this.utils.printReceived(received)}`)
          );
        };

    return { actual: received, message, pass };
  },
});

interface CustomMatchers<R = unknown> {
  /**
   * Check that a number is close enough to an other one.
   * Default tolerance is 10e-6 (order = -6)
   * @param expected expected float
   * @param order number of decimals or degits (1e[order])
   */
  toBeCloseTo(expected: number, order?: number): R;
  /**
   * Check that the type of a value is what you expect
   * @param expected expected type
   */
  toBeType(expected: string): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}
