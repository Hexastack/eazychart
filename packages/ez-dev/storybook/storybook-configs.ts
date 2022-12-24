export type PropArgType =
  | 'marker'
  | 'xAxis'
  | 'yAxis'
  | 'yLineAxis'
  | 'grid'
  | 'padding'
  | 'animationOptions'
  | 'errorMargins'
  | 'dimensions'
  | 'point'
  | 'bubble'
  | 'arc'
  | 'line'
  | 'area'
  | 'map'
  | 'geoJson';

export type ControlDefinition = {
  name: string;
  type: string;
  defaultValue?: string;
  options?: Array<string>;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
};

export const DISABLED_DEFAULT_ARG = {
  table: {
    disable: true,
  },
};

const BETA_CONTROL: ControlDefinition = {
  name: 'beta',
  type: 'range',
  min: 0,
  max: 1,
  step: 0.1,
  defaultValue: '0',
  description:
    'Determines the straigthness of the spline !! only works with curveBundle !!',
};

const STROKE_WIDTH_CONTROL: ControlDefinition = {
  name: 'strokeWidth',
  type: 'number',
  defaultValue: '2 or 0 px',
};

const CURVE_CONTROL: ControlDefinition = {
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
  defaultValue: 'curveLinear',
};

export const ERROR_MARGIN_CONTROLS: ControlDefinition[] = [
  {
    name: 'positive',
    type: 'text',
    defaultValue: 'positiveMargin',
    description: 'Sets the domainKey for the positive error margin',
  },
  {
    name: 'negative',
    type: 'text',
    defaultValue: 'negativeMargin',
    description: 'Sets the domainKey for the negative error margin',
  },
];

export const GRID_CONTROLS: ControlDefinition[] = [
  {
    name: 'color',
    type: 'color',
    defaultValue: '#a8a8a8',
  },
  {
    name: 'directions',
    type: 'inline-check',
    defaultValue: 'false, false',
    options: ['horizontal', 'vertical'],
    description: 'Adds the grid lines according to the selected axis',
  },
];

export const MARKER_CONTROLS: ControlDefinition[] = [
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

export const PADDING_CONTROLS: ControlDefinition[] = [
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

export const ANIMATION_CONTROLS: ControlDefinition[] = [
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

export const AXIS_CONTROLS: ControlDefinition[] = [
  {
    name: 'domainKey',
    type: 'text',
    defaultValue: "'value'",
  },
  {
    name: 'domainKeys',
    type: 'object',
    defaultValue: "['yValue1', 'yValue2']",
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
  {
    name: 'tickFormat',
    type: 'function',
    defaultValue: '(d: number) => `${d}°`',
    description:
      'A callback function to format the axis ticks (to add suffix/prefix for example)',
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
    type: 'range',
    min: 0,
    max: 100,
    step: 1,
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
    type: 'range',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: '1px',
  },
  {
    name: 'maxRadius',
    type: 'range',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: '25px',
  },
  {
    name: 'domainKey',
    type: 'text',
    defaultValue: 'rValue',
  },
  {
    name: 'fill',
    type: 'color',
    defaultValue: 'rgba(209, 46, 84, 0.5)',
  },
];

export const LINE_CONTROLS: ControlDefinition[] = [
  CURVE_CONTROL,
  {
    name: 'stroke',
    type: 'color',
    defaultValue: '#ef476f',
  },
  STROKE_WIDTH_CONTROL,
  BETA_CONTROL,
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
  STROKE_WIDTH_CONTROL,
];

export const AREA_CONTROLS: ControlDefinition[] = [
  CURVE_CONTROL,
  BETA_CONTROL,
  STROKE_WIDTH_CONTROL,
  {
    name: 'stroke',
    type: 'color',
    defaultValue: '#26547c',
  },
  {
    name: 'fill',
    type: 'color',
    defaultValue: '#26547cb0',
  },
  {
    name: 'opacity',
    type: 'range',
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: '0.5',
  },
];

export const MAP_CONTROLS: ControlDefinition[] = [
  {
    name: 'geoDomainKey',
    type: 'text',
    defaultValue: 'adm1_code',
  },
  {
    name: 'valueDomainKey',
    type: 'text',
    defaultValue: 'value',
  },
  {
    name: 'stroke',
    type: 'color',
    defaultValue: '#ffffff',
  },
  {
    name: 'fill',
    type: 'color',
    defaultValue: '#324678',
  },
  {
    name: 'projectionType',
    type: 'select',
    options: [
      'geoMercator',
      'geoTransverseMercator',
      'geoOrthographic',
      'geoEqualEarth',
      'geoEquirectangular',
      'geoNaturalEarth1',
      'geoAzimuthalEqualArea',
      'geoGnomonic',
      'geoStereographic',
      'geoConicConformal',
      'geoConicEqualArea',
      'geoConicEquidistant',
    ],
    defaultValue: 'geoMeractor',
  },
];

export const GEOJSON_CONTROLS: ControlDefinition[] = [
  {
    name: 'type',
    type: 'text',
    defaultValue: 'FeatureCollection',
  },
  {
    name: 'features',
    type: 'object',
  },
];

export const CONTROLS_MAP: {
  [category in PropArgType]: ControlDefinition[];
} = {
  marker: MARKER_CONTROLS,
  xAxis: AXIS_CONTROLS,
  yAxis: AXIS_CONTROLS,
  yLineAxis: AXIS_CONTROLS,
  grid: GRID_CONTROLS,
  padding: PADDING_CONTROLS,
  errorMargins: ERROR_MARGIN_CONTROLS,
  animationOptions: ANIMATION_CONTROLS,
  dimensions: DIMENSION_CONTROLS,
  point: POINT_CONTROLS,
  bubble: BUBBLE_CONTROLS,
  arc: ARC_CONTROLS,
  line: LINE_CONTROLS,
  area: AREA_CONTROLS,
  map: MAP_CONTROLS,
  geoJson: GEOJSON_CONTROLS,
};
