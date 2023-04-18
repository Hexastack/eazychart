import { createContext, useContext } from 'react';
import { defaultMapContext } from 'eazychart-core/src';

export const MapContext = createContext(defaultMapContext);

export const useMap = () => {
  return useContext(MapContext);
};
