import { NormalizedDatum } from '../types';

export const computedLegendBoxStyle = (d: NormalizedDatum) => {
  return {
    backgroundColor: d.isActive ? (d.color as string) : 'rgba(255, 255, 255, 0)',
    border: (d.color as string) + ' 2px solid',
  };
};
