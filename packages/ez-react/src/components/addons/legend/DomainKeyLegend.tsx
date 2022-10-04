import React, { DOMAttributes, useEffect, useState } from 'react';
import { NormalizedData, NormalizedDatum } from 'eazychart-core/src/types';
import { useChart } from '@/lib/use-chart';
import { LegendItem } from '@/components/addons/legend/LegendItem';

export interface LegendProps extends DOMAttributes<HTMLDivElement> {
  data: NormalizedData;
  toggleDatum: (datum: NormalizedDatum, newState: boolean, idx: number) => void;
}

export type DomainKeyLegendPropsWithRef = LegendProps &
  React.RefAttributes<HTMLDivElement>;

export const DomainKeyLegend: React.FC<DomainKeyLegendPropsWithRef> =
  React.forwardRef<HTMLDivElement, LegendProps>(
    ({ data, toggleDatum, ...rest }, ref) => {
      const { getScale, toggleDatumAttribute } = useChart();
      const colorScale = getScale('colorScale');
      const [domainKeyDict, setDomainKeyDict] = useState<{
        [key: string]: { color: string; isActive: boolean };
      }>({});

      useEffect(() => {
        if (colorScale) {
          const dict = colorScale.scale.domain().reduce((map, domainKey) => {
            return {
              ...map,
              [domainKey]: {
                color: colorScale.scale(domainKey),
                isActive: true,
              },
            };
          }, {});
          setDomainKeyDict(dict);
        }
      }, [colorScale]);

      const handleLegendClick = (
        domainKey: string,
        color: string,
        isActive: boolean,
        _idx: number
      ) => {
        setDomainKeyDict({
          ...domainKeyDict,
          [domainKey]: {
            color,
            isActive: !isActive,
          },
        });
        toggleDatumAttribute(domainKey);
      };

      return (
        <div className="ez-legend ez-legend--domain-key" {...rest} ref={ref}>
          {Object.entries(domainKeyDict).map(
            ([domainKey, { color, isActive }], idx: number) => {
              return (
                <LegendItem
                  key={domainKey}
                  onClick={() =>
                    handleLegendClick(domainKey, color, isActive, idx)
                  }
                  label={domainKey}
                  color={color}
                  isActive={isActive}
                />
              );
            }
          )}
        </div>
      );
    }
  );
