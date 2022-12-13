import {
  CONTROLS_MAP,
  DISABLED_DEFAULT_ARG,
  PropArgType,
} from './storybook-configs';

// This function takes in the CONFIGS and creates the corresponding storybook controls
export const getArgTypesByProp = (category: PropArgType) => {
  if (!(category in CONTROLS_MAP)) {
    throw new Error('Unknow controls category');
  }

  return CONTROLS_MAP[category].reduce(
    (
      acc: { [key: string]: Object },
      { name, type, description, defaultValue, options, min, max, step }
    ) => {
      if (acc) {
        acc[`${category}.${name}`] = {
          control: {
            type: `${type}`,
            options: options,
            min: min,
            max: max,
            step: step,
          },
          table: {
            category: `${category} options`,
            defaultValue: { summary: `${defaultValue}` },
          },
          description: description
            ? description
            : `Sets the ${category} ${name} value`,
        };
      }
      return acc;
    },
    { [category]: DISABLED_DEFAULT_ARG }
  );
};

export const markerArgTypes = getArgTypesByProp('marker');

export const cartesianChartArgTypes = {
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('xAxis'),
  isRTL: {
    control: { type: 'boolean' },
  },
};
export const yAxisArgTypes = {
  ...getArgTypesByProp('yAxis'),
};
const NESTED_PROPS = [
  'scopedSlots',
  'line',
  'point',
  'bubble',
  'area',
  'onResize',
  'xAxis.tickFormat',
  'yAxis.tickFormat',
  'labelDomainKey',
];

const extendBaseArgTypes = () => {
  // Disable default arg for nested props
  const nestedPropsArgTypes = NESTED_PROPS.reduce(
    (acc: { [key: string]: Object }, propName: string) => {
      if (acc) {
        acc[propName] = DISABLED_DEFAULT_ARG;
      }
      return acc;
    },
    {}
  );
  return { ...nestedPropsArgTypes };
};

export const baseChartArgTypes = {
  ...getArgTypesByProp('dimensions'),
  ...getArgTypesByProp('animationOptions'),
  ...getArgTypesByProp('padding'),
  // we're doing this to hide the objects that we've alreay unflattened and made an input field for each of their attributes
  ...extendBaseArgTypes(),
  data: {
    control: { type: 'object' },
    table: { defaultValue: { summary: 'Object' }, category: 'Data' },
  },
};

/*
 * @param args
 * @returns { argument.att1.att2.att3 ...}
 */
export const flattenArgs = (args: Object) => {
  let constructedArgs = {} as { [key: string]: {} };
  Object.entries(args).forEach((val) => {
    const [key, value] = val;
    if (
      ['string', 'boolean', 'number'].includes(typeof value) ||
      Array.isArray(value)
    ) {
      constructedArgs[key] = value;
    } else {
      for (const innerKey in value) {
        if (Array.isArray(value[innerKey])) {
          constructedArgs = {
            ...constructedArgs,
            ...flattenTabArgs(value[innerKey], `${key}.${innerKey}`),
          };
        } else {
          constructedArgs[`${key}.${innerKey}`] = value[innerKey];
        }
      }
    }
  });
  return constructedArgs;
};

/**
 * @params deconstructedArgs
 * @returns deconstructedArgs {chartArgs} |  [chartColors]
 */

export const deconstructArgs = (
  deconstructedArgs: { [key: string]: any },
  key: string,
  values: Object | boolean | string | number,
  defaultArg: [] | {}
) => {
  const parsedKeys = key.split('.');
  if (parsedKeys.length === 1) {
    deconstructedArgs[key] = values;
  } else {
    const [parentKey, prop] = parsedKeys;
    deconstructedArgs[parentKey] = deconstructedArgs[parentKey] ?? defaultArg;
    deconstructedArgs[parentKey][prop] = values;
  }

  return deconstructedArgs;
};

export interface ArgsType {
  [key: string]:
    | boolean
    | string
    | number
    | Function
    | {
        [key: string]: boolean | string | number | Function;
      };
}

/**
 * Convert { area.stroke = "#fffff".strokeWidth= 0 }
 * To {area: {stroke: '#fffff'}}
 * @param args
 * @returns
 */
export const unFlattenArgs = (args: ArgsType) => {
  let deconstructedArgs = {} as any;
  let deconstructedArray = [] as Array<string>;

  for (const [key, value] of Object.entries(args)) {
    const values = value as string;
    const parsedKeys = key.split('.');
    if (/^[0-9]+$/.test(parsedKeys[1])) {
      deconstructedArray = deconstructArgs(
        deconstructedArray,
        key,
        values,
        []
      ) as string[];
    } else {
      deconstructedArgs = deconstructArgs(deconstructedArgs, key, values, {});
    }
  }
  return { ...deconstructedArgs, ...deconstructedArray };
};

// Flattens a table of args
export const flattenTabArgs = (args: Array<string>, argName: string) => {
  let constructedArgs = {} as { [key: string]: string };
  for (let i = 0; i < args.length; i++) {
    constructedArgs[`${argName}.${i}`] = args[i];
  }
  return constructedArgs;
};

/**
 * Takes in same type arguments table, the arg name and the type
 * @params (argTable: [], argName: '', type: 'ControlType')
 * @returns controls for each element in the arg table
 */
export const setTabArgs = (
  argTable: string[],
  argName: string,
  type: string
) => {
  let tabArgs = {} as { [key: string]: string | any };
  tabArgs = { [`${argName}`]: DISABLED_DEFAULT_ARG };
  for (let i = 0; i < argTable.length; i++) {
    const tabArg = {
      [`${argName}.${i}`]: {
        control: { type: type },
        table: {
          category: `Chart ${argName}`,
          defaultValue: { summary: `${type}` },
        },
        description: `Sets corresponding chart ${argName}`,
      },
    };
    tabArgs = { ...tabArgs, ...tabArg };
  }
  return tabArgs;
};
