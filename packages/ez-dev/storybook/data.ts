import { AnimationOptions, ChartPadding, RawData } from 'eazychart-core/src/types';


export const dimensions = {
  width: 800,
  height: 600,
};

export const rawData: RawData = [
  {
    value: 9,
    name: 'Alpha',
    id: '1',
    v: 2,
  },
  {
    value: 45,
    name: 'Beta',
    id: '2',
    v: 5,
  },
  {
    value: 29,
    name: 'Gamma',
    id: '3',
    v: 10,
  },
  {
    value: 30,
    name: 'Delta',
    id: '4',
    v: 4,
  },
  {
    value: 50,
    name: 'Epsilon',
    id: '5',
    v: 8,
  },
];

export const correlationData: RawData = [...Array(100).keys()].map(() => {
  const x = Math.random() * 100;
  const y = x + Math.random() * 50;
  const r = Math.random();
  return {
    xValue: +x.toFixed(2),
    yValue: +y.toFixed(2),
    rValue: r,
    sample: 'Sample',
  };
});

export const evolutionData: RawData = [...Array(23).keys()].map((_v, idx) => {
  const x = idx;
  const y = Math.random() * 10 + x * 10;
  const y1 = Math.random() * 100 + x * 20;
  const y2 = Math.random() * 1000 + x * 30;
  return {
    xValue: x,
    yValue: +y.toFixed(2),
    yValue1: +y1.toFixed(2),
    yValue2: +y2.toFixed(2),
    temperature: `Temperature at ${x}H`,
    positiveMargin: (0.2 + Math.random() * 0.2).toFixed(2),
    negativeMargin: (0.2 + Math.random() * 0.2).toFixed(2),
  };
});

export const colors = ['#26547c', '#ef476f', '#ffd166', '#06d6a0', '#06d6d1'];

export const gridColor = '#a8a8a8';

export const padding: ChartPadding = {
  left: 100,
  bottom: 100,
  right: 100,
  top: 100,
};

export const animationOptions: AnimationOptions = {
  easing: 'easeBack',
  duration: 400,
  delay: 0,
};
