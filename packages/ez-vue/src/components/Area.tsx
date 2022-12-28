import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import {
  AreaConfig,
  AreaData,
  Dimensions,
  MarkerConfig,
  PointDatum,
} from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { ScaleOrdinal } from 'eazychart-core/src';
import Point from '@/components/shapes/Point';
import LinePath from '@/components/shapes/LinePath';
import AreaPath from '@/components/shapes/AreaPath';
import Points from '@/components/Points';

@Component({ components: { Point, LinePath, AreaPath } })
export default class Area extends Vue {
  @InjectReactive('colorScale')
  private colorScale!: ScaleOrdinal;

  @Prop({
    type: String,
    required: true,
  })
  private readonly xDomainKey!: string;

  @Prop({
    type: String,
    required: true,
  })
  private readonly yDomainKey!: string;

  @Prop({
    type: Object as PropType<AreaConfig>,
    default() {
      return {
        stroke: '#339999',
        strokeWidth: 2,
        curve: 'curveLinear',
      };
    },
  })
  private readonly area!: AreaConfig;

  @Prop({
    type: Object as PropType<MarkerConfig>,
    default() {
      return {
        hidden: true,
        radius: 5,
        color: '#FFF',
      };
    },
  })
  private readonly marker!: MarkerConfig;

  get color() {
    const { colorScale, yDomainKey, area } = this;
    if (colorScale && colorScale.isDefined()) {
      if (colorScale.constructor.name === 'ScaleOrdinal') {
        return colorScale.scale(yDomainKey);
      }
      throw new Error('Area shape does not support non ordinal color scale');
    }
    return area.fill;
  }

  render() {
    const {
      xDomainKey, yDomainKey, color, area, marker,
    } = this;

    return (
      <Points
        xDomainKey={xDomainKey}
        yDomainKey={yDomainKey}
        stroke={color}
        scopedSlots={{
          default: ({
            shapeData,
            dimensions,
          }: {
            shapeData: PointDatum[];
            dimensions: Dimensions;
          }) => {
            const lineAreaData: AreaData = shapeData.map((d) => ({
              x: d.x,
              y0: dimensions.height,
              y1: d.y,
            }));
            return (
              <g class="ez-area">
                <AreaPath
                  shapeData={lineAreaData}
                  curve={area.curve}
                  beta={area.beta}
                  fill={color}
                  opacity={area.opacity}
                />
                <LinePath
                  shapeData={shapeData}
                  curve={area.curve}
                  beta={area.beta}
                  stroke={color}
                  strokeWidth={area.strokeWidth}
                />
                {!marker.hidden
                  && shapeData.map((shapeDatum) => (
                    <Point
                      key={shapeDatum.id}
                      shapeDatum={shapeDatum}
                      r={marker.radius}
                      fill={marker.color}
                      stroke={color}
                      strokeWidth={area.strokeWidth}
                    />
                  ))}
              </g>
            );
          },
        }}
      />
    );
  }
}
