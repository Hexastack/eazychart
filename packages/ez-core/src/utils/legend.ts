import { NormalizedDatum } from '../types';

export const computedLegendBoxStyle = (d: NormalizedDatum) => {
  return {
    backgroundColor: d.isActive ? d.color : 'rgba(255, 255, 255, 0)',
    border: d.color + ' 2px solid',
  };
};
