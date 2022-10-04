import React, { FC, SVGAttributes } from 'react';
import { LineConfig, MarkerConfig } from 'eazychart-core/src/types';
import { Segments } from './Segments';
import { useChart } from '@/lib/use-chart';

export interface SegmentsProps extends SVGAttributes<SVGGElement> {
  xDomainKey: string;
  yDomainKeys: string[];
  line?: LineConfig;
  marker?: MarkerConfig;
}

export const MultiLine: FC<SegmentsProps> = ({
  xDomainKey,
  yDomainKeys,
  line,
  marker,
}) => {
  const { excludedAttributes } = useChart();

  return (
    <g className="ez-multiline">
      {yDomainKeys
        .filter((yDomainKey) => !excludedAttributes.includes(yDomainKey))
        .map((yDomainKey) => {
          return (
            <Segments
              key={yDomainKey}
              xDomainKey={xDomainKey}
              yDomainKey={yDomainKey}
              line={line}
              marker={marker}
            />
          );
        })}
    </g>
  );
};
