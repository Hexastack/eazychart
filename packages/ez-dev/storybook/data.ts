import {
  AnimationOptions,
  ChartPadding,
  GeoFeatureCollection,
  RawData,
} from 'eazychart-core/src/types';

const GEOJSON_MAP = require('./africa-map.geojson.json');

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


export const evolutionData2: RawData = [
  {
    xValue: 0,
    yValue: +(Math.random() * 10).toFixed(2),
    yValue1: +(Math.random() * 100).toFixed(2),
    yValue2: +(Math.random() * 1000).toFixed(2),
    temperature: "Temperature at 0H",
    positiveMargin: (0.2 + Math.random() * 0.2).toFixed(2),
    negativeMargin: (0.2 + Math.random() * 0.2).toFixed(2),
  },
  {
    xValue: 1,
    yValue: +(Math.random() * 10 + 10).toFixed(2),
    yValue1: +(Math.random() * 100 + 20).toFixed(2),
    yValue2: +(Math.random() * 1000 + 30).toFixed(2),
    temperature: "Temperature at 1H",
    positiveMargin: (0.2 + Math.random() * 0.2).toFixed(2),
    negativeMargin: (0.2 + Math.random() * 0.2).toFixed(2),
  },
  {
    xValue: 2,
    yValue: +(Math.random() * 10 + 20).toFixed(2),
    yValue1: +(Math.random() * 100 + 40).toFixed(2),
    yValue2: +(Math.random() * 1000 + 60).toFixed(2),
    temperature: "Temperature at 2H",
    positiveMargin: (0.2 + Math.random() * 0.2).toFixed(2),
    negativeMargin: (0.2 + Math.random() * 0.2).toFixed(2),
  },
  {
    xValue: 3,
    yValue: +(Math.random() * 10 + 30).toFixed(2),
    yValue1: +(Math.random() * 100 + 60).toFixed(2),
    yValue2: +(Math.random() * 1000 + 90).toFixed(2),
    temperature: "Temperature at 3H",
    positiveMargin: (0.2 + Math.random() * 0.2).toFixed(2),
    negativeMargin: (0.2 + Math.random() * 0.2).toFixed(2),
  },
  {
    xValue: 4,
    yValue: +(Math.random() * 10 + 40).toFixed(2),
    yValue1: +(Math.random() * 100 + 80).toFixed(2),
    yValue2: +(Math.random() * 1000 + 120).toFixed(2),
    temperature: "Temperature at 4H",
    positiveMargin: (0.2 + Math.random() * 0.2).toFixed(2),
    negativeMargin: (0.2 + Math.random() * 0.2).toFixed(2),
  },
  {
    xValue: 5,
    yValue: +(Math.random() * 10 + 50).toFixed(2),
    yValue1: +(Math.random() * 100 + 100).toFixed(2),
    yValue2: +(Math.random() * 1000 + 150).toFixed(2),
    temperature: "Temperature at 5H",
    positiveMargin: (0.2 + Math.random() * 0.2).toFixed(2),
    negativeMargin: (0.2 + Math.random() * 0.2).toFixed(2),
  },
  {
    xValue: 5,
    yValue: +(Math.random() * 10 + 60).toFixed(2),
    yValue1: +(Math.random() * 100 + 120).toFixed(2),
    yValue2: +(Math.random() * 1000 + 180).toFixed(2),
    temperature: "Temperature at 6H",
    positiveMargin: (0.2 + Math.random() * 0.2).toFixed(2),
    negativeMargin: (0.2 + Math.random() * 0.2).toFixed(2),
  },
  {
    xValue: 7,
    yValue: +(Math.random() * 10 + 70).toFixed(2),
    yValue1: +(Math.random() * 100 + 140).toFixed(2),
    yValue2: +(Math.random() * 1000 + 210).toFixed(2),
    temperature: "Temperature at 7H",
    positiveMargin: (0.2 + Math.random() * 0.2).toFixed(2),
    negativeMargin: (0.2 + Math.random() * 0.2).toFixed(2),
  },
  {
    xValue: 8,
    yValue: +(Math.random() * 10 + 80).toFixed(2),
    yValue1: +(Math.random() * 100 + 160).toFixed(2),
    yValue2: +(Math.random() * 1000 + 240).toFixed(2),
    temperature: "Temperature at 8H",
    positiveMargin: (0.2 + Math.random() * 0.2).toFixed(2),
    negativeMargin: (0.2 + Math.random() * 0.2).toFixed(2),
  },
  {
    xValue: 9,
    yValue: +(Math.random() * 10 + 90).toFixed(2),
    yValue1: +(Math.random() * 100 + 180).toFixed(2),
    yValue2: +(Math.random() * 1000 + 270).toFixed(2),
    temperature: "Temperature at 9H",
    positiveMargin: (0.2 + Math.random() * 0.2).toFixed(2),
    negativeMargin: (0.2 + Math.random() * 0.2).toFixed(2),
  }
];


export const colors = ['#26547c', '#ef476f', '#ffd166', '#06d6a0', '#06d6d1'];

export const areaColors = ['#339999', '#993399', '#333399'];

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

export const mapGeoJson = (GEOJSON_MAP as GeoFeatureCollection);

export const mapData = (GEOJSON_MAP as GeoFeatureCollection).features.map(({ properties }) => {
  return {
    admin: properties?.admin,
    value: properties?.pop_rank,
    rValue: properties?.gdp_md,
  };
})