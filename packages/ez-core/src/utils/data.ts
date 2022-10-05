import {
  RawDatum,
  NormalizedDatum,
  RawData,
  NormalizedDataDict,
} from '../types';

export const findDatumLabel = (datum: RawDatum) => {
  const labelKey = Object.keys(datum).find(
    (key: string) => typeof datum[key] === 'string'
  );
  return labelKey ? datum[labelKey] : undefined;
};

export const normalizeData = (
  data: RawData,
  labelKey = 'label'
): NormalizedDataDict => {
  return data
    .map((d: RawDatum, index: number) => {
      return {
        ...d,
        id: d.id || index.toString(),
        label:
          labelKey in d ? d[labelKey] : findDatumLabel(d) || index.toString(),
      } as NormalizedDatum;
    })
    .reduce((acc: NormalizedDataDict, d: NormalizedDatum) => {
      acc[d.id] = d;
      return acc;
    }, {} as NormalizedDataDict);
};
