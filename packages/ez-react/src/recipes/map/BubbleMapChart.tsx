import React, { FC } from 'react';
import { BubbleConfig, GeoJsonData } from 'eazychart-core/src/types';
import { Map } from '@/components/Map';
import { Tooltip } from '@/components/addons/tooltip/Tooltip';
import { Chart } from '@/components/Chart';
import { ColorScale } from '@/components/scales/ColorScale';
import { MapChartProps } from './MapChart';
import { SqrtScale } from '@/components/scales/SqrtScale';
import { MapBubbles } from '@/components/MapBubbles';

export interface BubbleMapChartProps extends MapChartProps {
  bubble: BubbleConfig;
  layers?: Array<{
    geoJson: GeoJsonData;
    map: {
      stroke: string;
      fill: string;
    };
  }>;
}

export const BubbleMapChart: FC<BubbleMapChartProps> = ({
  data,
  geoJson,
  colors = ['white', 'pink', 'red'],
  map = {
    geoDomainKey: 'geo_code',
    valueDomainKey: 'value',
    projectionType: 'geoMercator',
    stroke: 'white',
    fill: 'black',
  },
  layers = [],
  bubble = {
    domainKey: 'rValue',
    minRadius: 1,
    maxRadius: 100,
    opacity: 0.5,
    stroke: 'black',
    strokeWidth: 1,
    colors: ['green', 'yellowgreen', 'yellow'],
  },
  animationOptions = {
    easing: 'easeBack',
    duration: 400,
    delay: 0,
  },
  padding = {
    left: 100,
    bottom: 100,
    right: 100,
    top: 100,
  },
  dimensions = {},
  onShapeClick,
  scopedSlots = {
    // @todo : support Legend
    // LegendComponent: Legend,
    TooltipComponent: Tooltip,
  },
}) => {
  return (
    <Chart
      dimensions={dimensions}
      rawData={data}
      padding={padding}
      animationOptions={animationOptions}
      onShapeClick={onShapeClick}
      scopedSlots={scopedSlots}
    >
      <ColorScale
        type={'quantile'}
        domainKey={map.valueDomainKey}
        range={colors}
      >
        <Map map={map} geoJson={geoJson}>
          <ColorScale
            type={'quantile'}
            domainKey={bubble.domainKey}
            range={bubble.colors}
          >
            {layers.map((layer, idx) => (
              <Map
                key={idx}
                map={{
                  ...map,
                  ...layer.map,
                }}
                geoJson={layer.geoJson}
              />
            ))}
            <SqrtScale
              domainKey={bubble.domainKey}
              range={[bubble.minRadius, bubble.maxRadius]}
            >
              <MapBubbles
                geoDomainKey={map.geoDomainKey}
                rDomainKey={bubble.domainKey}
                stroke={bubble.stroke}
                strokeWidth={bubble.strokeWidth}
                opacity={bubble.opacity}
              />
            </SqrtScale>
          </ColorScale>
        </Map>
      </ColorScale>
    </Chart>
  );
};
