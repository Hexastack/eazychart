export type PropArgType =
  | 'marker'
  | 'grid'
  | 'padding'
  | 'animationOptions'
  | 'xAxis'
  | 'yAxis'
  | 'dimensions'
  | 'point'
  | 'bubble'
  | 'arc'
  | 'line'
  | 'area';

export type ControlDefinition = {
  name: string;
  type: string;
  defaultValue: any;
  options?: Array<any>;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
};

export const GRID_ARG_TYPES: ControlDefinition[] = [
  {
    name: 'color',
    type: 'color',
    defaultValue: '#a8a8a8',
  },
  {
    name: 'directions',
    type: 'inline-check',
    defaultValue: '#a8a8a8',
    options: ['horizontal', 'vertical'],
    description: 'Adds the grid lines according to the selected axis',
  },
];

export const MARKER_ARG_TYPES: ControlDefinition[] = [
  {
    name: 'color',
    type: 'color',
    defaultValue: '#FFF',
    description: 'Sets the marker color',
  },
  {
    name: 'hidden',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Toggles the marker',
  },
  {
    name: 'radius',
    type: 'number',
    defaultValue: '5px',
    description: 'Sets the marker radius',
  },
];

export const PADDING_ARG_TYPES: ControlDefinition[] = [
  {
    name: 'left',
    type: 'number',
    defaultValue: '100px',
  },
  {
    name: 'right',
    type: 'number',
    defaultValue: '100px',
  },
  {
    name: 'top',
    type: 'number',
    defaultValue: '100px',
  },
  {
    name: 'bottom',
    type: 'number',
    defaultValue: '100px',
  },
];

export const ANIMATION_ARG_TYPES: ControlDefinition[] = [
  {
    name: 'duration',
    type: 'number',
    defaultValue: '400ms',
  },
  {
    name: 'delay',
    type: 'number',
    defaultValue: '0ms',
  },
  {
    name: 'easing',
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
    defaultValue: 'easeBack',
    description: 'Sets the animation type',
  },
];

export const AXIS_ARG_TYPES: ControlDefinition[] = [
  {
    name: 'domainKey',
    type: 'object',
    defaultValue: '400ms',
  },
  {
    name: 'title',
    type: 'text',
    defaultValue: 'text',
  },
  {
    name: 'title',
    type: 'text',
    defaultValue: 'text',
  },
  {
    name: 'nice',
    type: 'number',
    defaultValue: '2',
    description: "Rounds the domain to 'nice' values ex: [-0.78,0.9] to [-1,1]",
  },
];

export const DIMENSION_CONTROLS: ControlDefinition[] = [
  {
    name: 'width',
    type: 'number',
    defaultValue: '800px',
  },
  {
    name: 'height',
    type: 'number',
    defaultValue: '600px',
  },
];

export const POINT_CONTROLS: ControlDefinition[] = [
  {
    name: 'radius',
    type: 'number',
    defaultValue: '5px',
  },
  {
    name: 'color',
    type: 'color',
    defaultValue: '#FF3366',
  },
];

export const BUBBLE_CONTROLS: ControlDefinition[] = [
  {
    name: 'minRadius',
    type: 'number',
    defaultValue: '1px',
  },
  {
    name: 'domainKey',
    type: 'text',
    defaultValue: 'rValue',
  },
  {
    name: 'maxRadius',
    type: 'number',
    defaultValue: '25px',
  },
  {
    name: 'fill',
    type: 'color',
    defaultValue: 'rgba(209, 46, 84, 0.5)',
  },
];

export const LINE_CONTROLS: ControlDefinition[] = [
  {
    name: 'strokeWidth',
    type: 'number',
    defaultValue: '2px',
  },
  {
    name: 'stroke',
    type: 'color',
    defaultValue: '#ef476f',
  },
  {
    name: 'curve',
    type: 'select',
    options: [
      'curveLinear',
      'curveBasis',
      'curveBumpX',
      'curveBumpY',
      'curveBundle',
      'curveCardinal',
      'curveNatural',
      'curveStep',
      'curveStepAfter',
      'curveStepBefore',
    ],
    defaultValue: '2px',
  },
  {
    name: 'beta',
    type: 'range',
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: '0',
    description: 'Determines the straigthness of the spline',
  },
];

export const ARC_CONTROLS: ControlDefinition[] = [
  {
    name: 'donutRadius',
    type: 'range',
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: '0',
  },
  {
    name: 'cornerRadius',
    type: 'range',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: '0',
  },
  {
    name: 'padAngle',
    type: 'number',
    defaultValue: '0',
  },
  {
    name: 'padRadius',
    type: 'number',
    defaultValue: '0',
  },
  {
    name: 'stroke',
    type: 'color',
    defaultValue: 'Transparent',
  },
  {
    name: 'strokeWidth',
    type: 'number',
    defaultValue: '0',
  },
];

export const AREA_CONTROLS: ControlDefinition[] = [
  {
    name: 'stroke',
    type: 'color',
    defaultValue: '#26547c',
  },
  {
    name: 'strokeWidth',
    type: 'number',
    defaultValue: '2px',
  },
  {
    name: 'fill',
    type: 'color',
    defaultValue: '#26547cb0',
  },
];
export const DISABLED_DEFAULT_ARG = {
  table: {
    disable: true,
  },
};

export const MULTI_Y_AXIS_CONTROLS = {
  yAxis: {
    control: { type: 'object' },
    table: {
      category: 'Multi chart Y Axis Options',
      defaultValue: { summary: 'yValues' },
    },
    description: 'Sets the Y axis domain keys and title for multi chart',
  },
};

export const LINE_COLUMN_CONTROLS = {
  'line.strokeWidth': {
    control: { type: 'number' },
    table: { category: 'Line Options', defaultValue: { summary: '2' } },
    description: 'Sets the line stroke width',
  },
  'line.stroke': {
    control: { type: 'color' },
    table: { category: 'Line Options', defaultValue: { summary: '#81248d' } },
    description: 'Sets the line stroke color',
  },
  yLineAxis: {
    control: { type: 'object' },
    table: {
      category: 'Line Options',
      defaultValue: { summary: 'yValues' },
    },
    description: 'Sets the Y axis domain key and title for the line',
  },
};
export const CONTROLS_MAP: { [category in PropArgType]: ControlDefinition[] } =
  {
    marker: MARKER_ARG_TYPES,
    grid: GRID_ARG_TYPES,
    padding: PADDING_ARG_TYPES,
    animationOptions: ANIMATION_ARG_TYPES,
    xAxis: AXIS_ARG_TYPES,
    yAxis: AXIS_ARG_TYPES,
    dimensions: DIMENSION_CONTROLS,
    point: POINT_CONTROLS,
    bubble: BUBBLE_CONTROLS,
    arc: ARC_CONTROLS,
    line: LINE_CONTROLS,
    area: AREA_CONTROLS,
  };
