import React, { DOMAttributes } from 'react';
import { NormalizedData, NormalizedDatum } from 'eazychart-core/src/types';
import { computedLegendBoxStyle } from 'eazychart-core/src';

export interface LegendProps extends DOMAttributes<HTMLDivElement> {
  data: NormalizedData;
  toggleDatum: (datum: NormalizedDatum, newState: boolean, idx: number) => void;
}

export type LegendPropsWithRef = LegendProps &
  React.RefAttributes<HTMLDivElement>;

export const Legend: React.FC<LegendPropsWithRef> = React.forwardRef<
  HTMLDivElement,
  LegendProps
>(({ data, toggleDatum, ...rest }, ref) => {
  const handleLegendClick = (d: NormalizedDatum, idx: number) => {
    toggleDatum(d, !d.isActive, idx);
  };

  return (
    <div className="ez-legend" {...rest} ref={ref}>
      {data?.map((d: NormalizedDatum, idx: number) => {
        return (
          <div
            key={d.id}
            onClick={() => handleLegendClick(d, idx)}
            role="button"
            className={`ez-legend-key${
              !d.isActive ? ' ez-legend-disable' : ''
            }`}
          >
            <div
              className="ez-legend-box"
              style={computedLegendBoxStyle(d)}
            ></div>
            <span className="ez-legend-text">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
});
