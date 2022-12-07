import {
  GRID_CONFIG,
  MARKER_CONFIG,
  PADDING_CONFIG,
  ANIMATION_CONFIG,
  AXIS_CONFIG,
  DIMENSION_CONFIG,
} from './storybookConfigs';

const DISABLED_DEFAULT_ARG = {
  table: {
    disable: true,
  },
};

// This function takes in the CONFIGS and creates the corresponding storybook controls
const elementSettings = (
  optionCategory: string,
  controls: { [key: string]: string | undefined | string[] }[]
) => {
  return controls.reduce(
    (
      acc: { [key: string]: Object },
      { elemName, elemControl, customDesc, defValue, elemOptions }
    ) => {
      console.log(elemOptions);
      if (acc) {
        acc[`${optionCategory}.${elemName}`] = {
          control: {
            type: `${elemControl}`,
            options: elemOptions,
          },
          table: {
            category: `${optionCategory} options`,
            defaultValue: { summary: `${defValue}` },
          },
          description: customDesc
            ? customDesc
            : `Sets the ${optionCategory} ${elemName} value`,
        };
      }
      return acc;
    },
    {}
  );
};

export const markerArgTypesOptions = {
  marker: DISABLED_DEFAULT_ARG,
  ...elementSettings('marker', MARKER_CONFIG),
};

const gridArgTypesOptions = {
  'grid.directions': DISABLED_DEFAULT_ARG,
  grid: DISABLED_DEFAULT_ARG,
  ...elementSettings('grid', GRID_CONFIG),
};

export const paddingArgTypesOptions = {
  padding: DISABLED_DEFAULT_ARG,
  ...elementSettings('padding', PADDING_CONFIG),
};

export const animationArgTypesOptions = {
  animationOptions: DISABLED_DEFAULT_ARG,
  ...elementSettings('animationOptions', ANIMATION_CONFIG),
};

export const dimensionArgTypesOptions = {
  dimensions: DISABLED_DEFAULT_ARG,
  ...elementSettings('dimensions', DIMENSION_CONFIG),
};

const axisArgTypesOptions = {
  yAxis: DISABLED_DEFAULT_ARG,
  xAxis: DISABLED_DEFAULT_ARG,
  ...elementSettings('xAxis', AXIS_CONFIG),
  ...elementSettings('yAxis', AXIS_CONFIG),
};

const NESTED_PROPS = ['scopedSlots', 'line', 'point', 'bubble', 'area'];

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
  ...axisArgTypesOptions,
  ...dimensionArgTypesOptions,
  ...animationArgTypesOptions,
  ...paddingArgTypesOptions,
  ...gridArgTypesOptions,
  // we're doing this to hide the objects that we've alreay unflattened and made an input field for each of their attributes
  ...extendBaseArgTypes(),
  isRTL: {
    control: { type: 'boolean' },
  },
  data: {
    control: { type: 'object' },
    table: { defaultValue: { summary: 'Object' }, category: 'Data' },
  },
};

/*
 * @param args
 * @returns { argument.att1, argument.att2, argument.att3 ...}
 */
export const flattenArgs = (args: Object) => {
  const constructedArgs = {} as { [key: string]: {} };
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
 * @params deconstructedArgs, key, values, defaultArg
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
 * Convert { area.stroke = "#fffff", area.strokeWidth= 0 }
 * To {area: {stroke: '#fffff'}}
 * @param args
 * @returns
 */
export const unFlattenArgs = (args: ArgsType) => {
  let deconstructedArgs = {} as any;
  let colors = [] as Array<string>;
  for (const [key, value] of Object.entries(args)) {
    const values = value as string;
    const parsedKeys = key.split('.');
    if (parsedKeys[0] === 'colors') {
      colors = deconstructArgs(colors, key, values, []) as string[];
    } else {
      deconstructedArgs = deconstructArgs(deconstructedArgs, key, values, {});
    }
  }
  return { ...deconstructedArgs, ...colors };
};

// Flattens colors table
export const flattenColors = (args: Array<string>) => {
  let constructedArgs = {} as { [key: string]: string };
  for (let i = 0; i < args.length; i++) {
    constructedArgs[`colors.${i}`] = args[i];
  }
  return constructedArgs;
};

// Sets colorArgtypes
export const setColorArgs = (colors: string[]) => {
  let colorArgs = {};

  for (let i = 0; i < colors.length; i++) {
    const a = {
      [`colors.${i}`]: {
        control: { type: 'color' },
        table: {
          category: 'Chart colors',
          defaultValue: { summary: 'HexColor' },
        },
        description: 'Sets corresponding chart color',
      },
    };
    colorArgs = { ...colorArgs, ...a };
  }
  return colorArgs;
};
