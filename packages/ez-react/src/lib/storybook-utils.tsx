/* eslint-disable no-useless-computed-key */
import React, { FC } from 'react';

export const baseChartArgTypes = {
  isRTL: {
    control: { type: 'boolean' },
  },
  ['area.stroke']: {
    control: { type: 'color' },
  },
  ['area.fill']: {
    control: { type: 'color' },
  },
  ['marker.color']: {
    control: { type: 'color' },
  },
};

export const ChartWrapper: FC<{ style?: any }> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export const flattenArgs = (args: Object) => {
  const parsedArgs = {} as any;
  for (const [key, value] of Object.entries(args)) {
    if (
      ['string', 'boolean', 'number'].includes(typeof value) ||
      Array.isArray(value)
    ) {
      parsedArgs[key] = value;
    } else {
      for (const innerKey in value)
        parsedArgs[`${key}.${innerKey}`] = value[innerKey];
    }
  }
  return parsedArgs;
};

export const unFlattenArgs = (args: Object) => {
  const parsedArgs = {} as any;
  for (const [key, value] of Object.entries(args)) {
    const values = value as any;
    const parsedKeys = key.split('.');
    if (parsedKeys.length === 1) {
      parsedArgs[key] = values;
    } else {
      const [parentKey, prop] = parsedKeys;
      parsedArgs[parentKey] = parsedArgs[parentKey] ?? {};
      parsedArgs[parentKey][prop] = values;
    }
  }
  return parsedArgs;
};
