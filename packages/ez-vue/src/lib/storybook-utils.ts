/* eslint-disable @typescript-eslint/no-explicit-any */

import Component from 'vue-class-component';
import Vue from 'vue';

export const markerArgTypesOptions = {
  marker: {
    table: {
      disable: true,
    },
  },
  'marker.color': {
    control: { type: 'color' },
    table: { category: 'Marker options', defaultValue: { summary: '#FFF' } },
    description: 'Sets the marker color',
  },
  'marker.hidden': {
    control: { type: 'boolean' },
    table: { category: 'Marker options', defaultValue: { summary: true } },
    description: 'Toggles the marker',
  },
  'marker.radius': {
    control: { type: 'number' },
    table: { category: 'Marker options', defaultValue: { summary: '5px' } },
    description: 'Sets the marker radius',
  },
};

const gridArgTypesOptions = {
  'grid.directions': {
    table: {
      disable: true,
    },
  },

  grid: {
    table: {
      disable: true,
    },
  },
  'grid.directions.Direction': {
    control: { type: 'inline-check', options: ['horizontal', 'vertical'] },
    table: { category: 'Grid options', defaultValue: { summary: 'None' } },
    description: 'Adds the grid according to the selected axis',
  },
  'grid.color': {
    control: { type: 'color' },
    table: { category: 'Grid options', defaultValue: { summary: '#a8a8a8' } },
    description: 'Sets the grid lines color',
  },
};

export const paddingArgTypesOptions = {
  padding: {
    table: {
      disable: true,
    },
  },
  'padding.left': {
    control: { type: 'number' },
    table: { category: 'Padding options', defaultValue: { summary: '100px' } },
    description: 'Sets the left side padding value',
  },
  'padding.bottom': {
    control: { type: 'number' },
    table: { category: 'Padding options', defaultValue: { summary: '100px' } },
    description: 'Sets the bottom side padding value',
  },
  'padding.right': {
    control: { type: 'number' },
    table: { category: 'Padding options', defaultValue: { summary: '100px' } },
    description: 'Sets the right side padding value',
  },
  'padding.top': {
    control: { type: 'number' },
    table: { category: 'Padding options', defaultValue: { summary: '100px' } },
    description: 'Sets the top side padding value',
  },
};

export const animationArgTypesOptions = {
  animationOptions: {
    table: {
      disable: true,
    },
  },

  'animationOptions.duration': {
    control: { type: 'number' },
    table: {
      category: 'Animation options',
      defaultValue: { summary: '400ms' },
    },
    description: 'Sets the animation duration',
  },
  'animationOptions.delay': {
    control: { type: 'number' },
    table: { category: 'Animation options', defaultValue: { summary: '0ms' } },
    description: 'Sets the delay for the animation',
  },
  'animationOptions.easing': {
    control: {
      type: 'select',
      options: [
        'easeBack',
        'easeBackIn',
        'easeBackOut',
        'easeBackInOut',
        'easeLinear',
        'easeExpout',
        'easeExpIn',
        'easePoly',
        'easePolyIn',
        'easePolyOut',
        'easePolyInOut',
        'easeElastic',
        'easeElasticIn',
        'easeElasticOut',
        'easeElasticInOut',
      ],
    },
    table: {
      category: 'Animation options',
      defaultValue: { summary: 'easeBack' },
    },
    description: 'Sets the animation type',
  },
};

export const dimensionArgTypesOptions = {
  dimensions: {
    table: {
      disable: true,
    },
  },
  'dimensions.width': {
    control: { type: 'number' },
    table: { category: 'Dimension props', defaultValue: { summary: '800px' } },
  },
  'dimensions.height': {
    control: { type: 'number' },
    table: { category: 'Dimension props', defaultValue: { summary: '600px' } },
  },
};

const axisArgTypesOptions = {
  'xAxis.tickFormat': {
    table: {
      disable: true,
    },
  },
  'yAxis.tickFormat': {
    table: {
      disable: true,
    },
  },
  xAxis: {
    table: {
      disable: true,
    },
  },
  'xAxis.domainKey': {
    control: { type: 'object' },
    table: { category: 'Axis Options', defaultValue: { summary: 'xValue' } },
    description: 'Sets the X axis domain key',
  },
  'yAxis.domainKey': {
    control: { type: 'object' },
    table: { category: 'Axis Options', defaultValue: { summary: 'yValue' } },
    description:
      'Sets the Y axis domain key when using the default chart (! not for multi charts!)',
    if: { arg: 'yAxis', truthy: false },
  },

  'xAxis.title': {
    control: { type: 'text' },
    table: { category: 'Axis Options', defaultValue: { summary: 'text' } },
    description: 'Sets the X axis title',
  },
  'yAxis.title': {
    control: { type: 'text' },
    table: { category: 'Axis Options', defaultValue: { summary: 'text' } },
    description:
      'Sets the Y axis title when using the default chart (! not for multi charts!)',
    if: { arg: 'yAxis', truthy: false },
  },
};
@Component
export class ChartWrapper extends Vue {
  render(h: Function) {
    return h('div', {}, this.$slots.default);
  }
}

@Component
export class ResizableChartWrapper extends Vue {
  render(h: Function) {
    return h(
      'div',
      {
        style: {
          width: '100%',
          height: '100vh',
          border: '2px solid #ccc',
          resize: 'auto',
          overflow: 'scroll',
        },
      },
      this.$slots.default,
    );
  }
}

export const baseChartArgTypes = {
  ...axisArgTypesOptions,
  ...dimensionArgTypesOptions,
  ...animationArgTypesOptions,
  ...paddingArgTypesOptions,
  ...gridArgTypesOptions,
  /* we're doing this to hide the objects that we've alreay unflattened
  and made an input field for each of their attributes */
  scopedSlots: {
    table: {
      disable: true,
    },
  },
  line: {
    table: {
      disable: true,
    },
  },
  point: {
    table: {
      disable: true,
    },
  },
  bubble: {
    table: {
      disable: true,
    },
  },
  area: {
    table: {
      disable: true,
    },
  },

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
  const constructedArgs = {} as any;
  Object.entries(args).forEach((val) => {
    const [key, value] = val;
    if (
      ['string', 'boolean', 'number'].includes(typeof value) || Array.isArray(value)
    ) {
      constructedArgs[key] = value;
    } else {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const innerKey in value) {
        constructedArgs[`${key}.${innerKey}`] = value[innerKey];
      }
    }
  });
  return constructedArgs;
};

/**
 * @params deconstructedArgs, key,values,defaultArg
 * @returns deconstructedArgs{ chartArgs} |  [chartColors]
 */
export const deconstructArgs = (
  deconstructedArgs: any,
  key: string,
  values: any,
  defaultArg: any,
) => {
  const args = deconstructedArgs;
  const parsedKeys = key.split('.');
  if (parsedKeys.length === 1) {
    args[key] = values;
  } else {
    const [parentKey, prop] = parsedKeys;
    args[parentKey] = deconstructedArgs[parentKey] ?? defaultArg;
    args[parentKey][prop] = values;
  }
  return args;
};

/**
 * convert { area.stroke = "#fffff", area.strokeWidth= 0 }
 * To {area: {stroke: '#fffff'}}
 * @param args
 * @returns
 */
export const unFlattenArgs = (args: Object) => {
  let deconstructedArgs = {} as any;
  let colors = [] as any;
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(args)) {
    const values = value as any;
    const parsedKeys = key.split('.');
    if (parsedKeys[0] === 'colors') {
      colors = deconstructArgs(colors, key, values, []);
    } else {
      deconstructedArgs = deconstructArgs(deconstructedArgs, key, values, {});
    }
  }
  return { ...deconstructedArgs, ...colors };
};

// Flattens colors table
export const flattenColors = (args: Array<string>) => {
  const constructedArgs = {} as any;
  for (let i = 0; i < args.length; i += 1) {
    constructedArgs[`colors.${i}`] = args[i];
  }
  return constructedArgs;
};

// sets colorArgtypes
export const setColorArgs = (colors: string[]) => {
  let colorArgs = {};

  for (let i = 0; i < colors.length; i += 1) {
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
