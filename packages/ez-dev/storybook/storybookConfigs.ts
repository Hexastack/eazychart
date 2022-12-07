export const GRID_CONFIG = [
  {
    elemName: 'color',
    elemControl: 'color',
    defValue: '#a8a8a8',
  },
  {
    elemName: 'directions.Direction',
    elemControl: 'inline-check',
    defValue: '#a8a8a8',
    elemOptions: ['horizontal', 'vertical'],
    customDesc: 'Adds the grid lines according to the selected axis',
  },
];

export const MARKER_CONFIG = [
  {
    elemName: 'color',
    elemControl: 'color',
    defValue: '#FFF',
    customDesc: 'Sets the marker color',
  },
  {
    elemName: 'hidden',
    elemControl: 'boolean',
    defValue: 'true',
    customDesc: 'Toggles the marker',
  },
  {
    elemName: 'radius',
    elemControl: 'number',
    defValue: '5px',
    customDesc: 'Sets the marker radius',
  },
];

export const PADDING_CONFIG = [
  {
    elemName: 'left',
    elemControl: 'number',
    defValue: '100px',
  },
  {
    elemName: 'right',
    elemControl: 'number',
    defValue: '100px',
  },
  {
    elemName: 'top',
    elemControl: 'number',
    defValue: '100px',
  },
  {
    elemName: 'bottom',
    elemControl: 'number',
    defValue: '100px',
  },
];

export const ANIMATION_CONFIG = [
  {
    elemName: 'duration',
    elemControl: 'number',
    defValue: '400ms',
  },
  {
    elemName: 'delay',
    elemControl: 'number',
    defValue: '0ms',
  },
  {
    elemName: 'easing',
    elemControl: 'select',
    elemOptions: [
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
    defValue: 'easeBack',
    customDesc: 'Sets the animation type',
  },
];

export const AXIS_CONFIG = [
  {
    elemName: 'domainKey',
    elemControl: 'object',
    defValue: '400ms',
  },
  {
    elemName: 'title',
    elemControl: 'text',
    defValue: 'text',
  },
  {
    elemName: 'title',
    elemControl: 'text',
    defValue: 'text',
  },
  {
    elemName: 'nice',
    elemControl: 'number',
    defValue: '2',
    customDesc: "Rounds the domain to 'nice' values ex: [-0.78,0.9] to [-1,1]",
  },
];

export const DIMENSION_CONFIG = [
  {
    elemName: 'width',
    elemControl: 'number',
    defValue: '800px',
  },
  {
    elemName: 'height',
    elemControl: 'number',
    defValue: '600px',
  },
];
