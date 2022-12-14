import {
  CONTROLS_MAP,
  DISABLED_DEFAULT_ARG,
  PropArgType,
} from './storybook-configs';

type ArgTypeOptions = {
  omit?: string[];
};

// This function takes in the CONFIGS and creates the corresponding storybook controls
export const getArgTypesByProp = (
  prop: PropArgType,
  options?: ArgTypeOptions
) => {
  if (!(prop in CONTROLS_MAP)) {
    throw new Error('Unknow controls category');
  }

  // Filter controls to omit certain fields
  const controls = CONTROLS_MAP[prop].filter(({ name }) => {
    return !options?.omit || (options.omit && !options.omit.includes(name));
  });

  return controls.reduce(
    (
      acc: { [key: string]: Object },
      { name, type, description, defaultValue, options, min, max, step }
    ) => {
      return {
        ...acc,
        [`${prop}.${name}`]: {
          control: {
            type,
            options,
            min,
            max,
            step,
          },
          table: {
            category: `${prop} options`,
            defaultValue: { summary: defaultValue },
          },
          description: description
            ? description
            : `Sets the ${prop} ${name} value`,
        },
      };
    },
    { [prop]: DISABLED_DEFAULT_ARG }
  );
};

export const markerArgTypes = getArgTypesByProp('marker');

export const cartesianChartArgTypes = {
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('xAxis'),
  ...getArgTypesByProp('yAxis'),

  isRTL: {
    control: { type: 'boolean' },
  },
};

export const yAxisArgTypes = getArgTypesByProp('yAxis');

export const baseChartArgTypes = {
  ...getArgTypesByProp('dimensions'),
  ...getArgTypesByProp('padding'),
  ...getArgTypesByProp('animationOptions'),
  data: {
    control: { type: 'object' },
    table: { defaultValue: { summary: 'Object' }, category: 'Data' },
  },
  colors: {
    table: {
      category: 'Chart colors',
    },
    description: 'Sets the corresponding chart color',
    if: { arg: 'colors', truthy: true },
  },
  scopedSlots: DISABLED_DEFAULT_ARG,
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
        constructedArgs[`${key}.${innerKey}`] = value[innerKey];
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
  // tabArgs = { [`${argName}`]: DISABLED_DEFAULT_ARG };
  tabArgs = {};
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
