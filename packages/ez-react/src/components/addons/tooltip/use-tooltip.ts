import { useContext } from 'react';
import { TooltipContext } from './TooltipContext';

export const useTooltip = () => {
  return useContext(TooltipContext);
};
