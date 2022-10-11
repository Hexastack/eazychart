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

/**
 * Convert {area: {stroke: '#fffff'}}
 * To { area.stroke = "#fffff" }
 *
 * @param args
 * @returns
 */
export const flattenArgs = (args: Object) => {
  let constructedArgs = {} as any;
  for (const [key, value] of Object.entries(args)) {
    if (
      ['string', 'boolean', 'number'].includes(typeof value) ||
      Array.isArray(value)
    ) {
      constructedArgs[key] = value;
    }
    // !!! TODO: confirm if array needs to be parsed as well !!!
    //  else if (Array.isArray(value)) {
    // let newArr = {} as any;
    // value.forEach((element, index) => {
    //   let test = {} as any;
    //   for (const [nestedKey, nestedValue] of Object.entries(element)) {
    //     test[`${key}.${index}.${nestedKey}`] = nestedValue;
    //   }
    //   newArr = { ...newArr, ...test };
    // });

    // constructedArgs = {
    //   ...constructedArgs,
    //   ...newArr,
    // };
    // }
    else {
      for (const innerKey in value)
        constructedArgs[`${key}.${innerKey}`] = value[innerKey];
    }
  }
  return constructedArgs;
};

/**
 * convert { area.stroke = "#fffff" }
 * To {area: {stroke: '#fffff'}}
 * @param args
 * @returns
 */
export const unFlattenArgs = (args: Object) => {
  const deconstructedArgs = {} as any;

  for (const [key, value] of Object.entries(args)) {
    const values = value as any;
    const parsedKeys = key.split('.');

    if (parsedKeys.length === 1) {
      deconstructedArgs[key] = values;
    } else {
      const [parentKey, prop] = parsedKeys;
      deconstructedArgs[parentKey] = deconstructedArgs[parentKey] ?? {};
      deconstructedArgs[parentKey][prop] = values;
    }
  }
  return deconstructedArgs;
};
