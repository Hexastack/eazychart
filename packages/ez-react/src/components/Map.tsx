import React from 'react';
import { GeoJSONData, MapConfig, ShapeDatum } from 'eazychart-core/src/types';
import { MapPath } from './shapes/MapPath';
import { dimensions } from 'eazychart-dev/storybook/data';
import { useColorScale } from './scales/ColorScale';
import { useChart } from '@/lib/use-chart';

export type MapChartProps = {
  isWrapped?: boolean;
  map: MapConfig;
  mapData: GeoJSONData;
};

export default function Map({ mapData, map }: MapChartProps) {
  const { colorScale } = useColorScale();
  const { data } = useChart();

  return (
    <g>
      {mapData.features.map((feature, idx) => {
        const datum = data.find(
          (datum) =>
            feature.properties &&
            datum[map.geoDomainKey] === feature.properties[map.geoDomainKey]
        );

        const color = datum
          ? colorScale.scale(datum[map.valueDomainKey] as number)
          : map.fill;

        return (
          <MapPath
            key={idx}
            shapeDatum={{ id: datum?.id || '', color } as ShapeDatum}
            feature={feature}
            stroke={map.stroke}
            projectionType={map.projectionType}
            fill={color}
            width={dimensions.width}
            height={dimensions.height}
          />
        );
      })}
    </g>
  );
}
