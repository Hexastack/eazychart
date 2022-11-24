export const markerArgTypesOptions = {
  marker: {
    table: {
      disable: true,
    },
  },
  "marker.color": {
    control: { type: "color" },
    table: { category: "Marker options", defaultValue: { summary: "#FFF" } },
    description: "Sets the marker color",
  },
  "marker.hidden": {
    control: { type: "boolean" },
    table: { category: "Marker options", defaultValue: { summary: true } },
    description: "Toggles the marker",
  },
  "marker.radius": {
    control: { type: "number" },
    table: { category: "Marker options", defaultValue: { summary: "5px" } },
    description: "Sets the marker radius",
  },
};

const gridArgTypesOptions = {
  "grid.directions": {
    table: {
      disable: true,
    },
  },

  grid: {
    table: {
      disable: true,
    },
  },
  "grid.directions.Direction": {
    control: { type: "inline-check", options: ["horizontal", "vertical"] },
    table: { category: "Grid options", defaultValue: { summary: "None" } },
    description: "Adds the grid according to the selected axis",
  },
  "grid.color": {
    control: { type: "color" },
    table: { category: "Grid options", defaultValue: { summary: "#a8a8a8" } },
    description: "Sets the grid lines color",
  },
};

const PADDING_TYPES = ["left", "right", "top", "bottom"];
const paddingSettings = () => {
  return PADDING_TYPES.reduce(
    (acc: { [key: string]: Object }, paddingType: string) => {
      if (acc) {
        acc[`padding.${paddingType}`] = {
          control: { type: "number" },
          table: {
            category: "Padding options",
            defaultValue: { summary: "100px" },
          },
          description: `Sets the ${paddingType} side padding value`,
        };
      }
      return acc;
    },
    {}
  );
};

export const paddingArgTypesOptions = {
  padding: {
    table: {
      disable: true,
    },
  },
  ...paddingSettings(),
};

export const animationArgTypesOptions = {
  animationOptions: {
    table: {
      disable: true,
    },
  },

  "animationOptions.duration": {
    control: { type: "number" },
    table: {
      category: "Animation options",
      defaultValue: { summary: "400ms" },
    },
    description: "Sets the animation duration",
  },
  "animationOptions.delay": {
    control: { type: "number" },
    table: { category: "Animation options", defaultValue: { summary: "0ms" } },
    description: "Sets the delay for the animation",
  },
  "animationOptions.easing": {
    control: {
      type: "select",
      options: [
        "easeBack",
        "easeBackIn",
        "easeBackOut",
        "easeBackInOut",
        "easeLinear",
        "easeExpout",
        "easeExpIn",
        "easePoly",
        "easePolyIn",
        "easePolyOut",
        "easePolyInOut",
        "easeElastic",
        "easeElasticIn",
        "easeElasticOut",
        "easeElasticInOut",
      ],
    },
    table: {
      category: "Animation options",
      defaultValue: { summary: "easeBack" },
    },
    description: "Sets the animation type",
  },
};

export const dimensionArgTypesOptions = {
  dimensions: {
    table: {
      disable: true,
    },
  },
  "dimensions.width": {
    control: { type: "number" },
    table: { category: "Dimension props", defaultValue: { summary: "800px" } },
  },
  "dimensions.height": {
    control: { type: "number" },
    table: { category: "Dimension props", defaultValue: { summary: "600px" } },
  },
};

const axisArgTypesOptions = {
  "xAxis.tickFormat": {
    table: {
      disable: true,
    },
  },
  "yAxis.tickFormat": {
    table: {
      disable: true,
    },
  },
  xAxis: {
    table: {
      disable: true,
    },
  },
  "xAxis.domainKey": {
    control: { type: "object" },
    table: { category: "Axis Options", defaultValue: { summary: "xValue" } },
    description: "Sets the X axis domain key",
  },
  "yAxis.domainKey": {
    control: { type: "object" },
    table: { category: "Axis Options", defaultValue: { summary: "yValue" } },
    description:
      "Sets the Y axis domain key when using the default chart (! not for multi charts!)",
    if: { arg: "yAxis", truthy: false },
  },

  "xAxis.title": {
    control: { type: "text" },
    table: { category: "Axis Options", defaultValue: { summary: "text" } },
    description: "Sets the X axis title",
  },
  "yAxis.title": {
    control: { type: "text" },
    table: { category: "Axis Options", defaultValue: { summary: "text" } },
    description:
      "Sets the Y axis title when using the default chart (! not for multi charts!)",
    if: { arg: "yAxis", truthy: false },
  },
};

const DISABLED_DEFAULT_ARG = {
  table: {
    disable: true,
  },
};

const NESTED_PROPS = ["scopedSlots", "line", "point", "bubble", "area"];

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
    control: { type: "boolean" },
  },
  data: {
    control: { type: "object" },
    table: { defaultValue: { summary: "Object" }, category: "Data" },
  },
};

/*
 * @param args
 * @returns { argument.att1, argument.att2, argument.att3 ...}
 */
export const flattenArgs = (args: Object) => {
  const constructedArgs = {} as {[key: string]: {}};
  Object.entries(args).forEach((val) => {
    const [key, value] = val;
    if (
      ["string", "boolean", "number"].includes(typeof value) ||
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
  deconstructedArgs: {[key:string]: any},
  key: string,
  values: Object | boolean | string | number,
  defaultArg: [] | {}
) => {
  const parsedKeys = key.split(".");
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
    const parsedKeys = key.split(".");
    if (parsedKeys[0] === "colors") {
      colors = deconstructArgs(colors, key, values, []) as string[];
    } else {
      deconstructedArgs = deconstructArgs(deconstructedArgs, key, values, {});
    }
  }
  return { ...deconstructedArgs, ...colors };
};


// Flattens colors table
export const flattenColors = (args: Array<string>) => {
  let constructedArgs = {} as  {[key: string]: string };
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
        control: { type: "color" },
        table: {
          category: "Chart colors",
          defaultValue: { summary: "HexColor" },
        },
        description: "Sets corresponding chart color",
      },
    };
    colorArgs = { ...colorArgs, ...a };
  }
  return colorArgs;
};
