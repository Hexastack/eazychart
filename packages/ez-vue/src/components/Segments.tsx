import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { LineConfig, MarkerConfig, PointDatum } from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { ScaleOrdinal } from 'eazychart-core/src';
import Point from '@/components/shapes/Point';
import LinePath from '@/components/shapes/LinePath';
import Points from '@/components/Points';

@Component({ components: { Point, LinePath } })
export default class Segments extends Vue {
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
    type: Object as PropType<LineConfig>,
    default() {
      return {
        stroke: '#339999',
        strokeWidth: 2,
        curve: 'curveLinear',
      };
    },
  })
  private readonly line!: LineConfig;

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
    const { colorScale, yDomainKey, line } = this;
    return colorScale && colorScale.isDefined() ? colorScale.scale(yDomainKey) : line.stroke;
  }

  render() {
    const {
      xDomainKey, yDomainKey, color, line, marker,
    } = this;

    return (
      <Points
        xDomainKey={xDomainKey}
        yDomainKey={yDomainKey}
        stroke={color}
        scopedSlots={{
          default: ({ shapeData }: { shapeData: PointDatum[] }) => {
            const pointData: PointDatum[] = shapeData.map((pointDatum) => ({
              ...pointDatum,
              color,
            }));
            return (
              <g class="ez-segments">
                <LinePath
                  shapeData={pointData}
                  curve={line.curve}
                  beta={line.beta}
                  stroke={color}
                  strokeWidth={line.strokeWidth}
                />
                {!marker.hidden
                  && pointData.map((pointDatum) => (
                      <Point
                        key={pointDatum.id}
                        shapeDatum={pointDatum}
                        r={marker.radius}
                        fill={marker.color}
                        stroke={color}
                        strokeWidth={line.strokeWidth}
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
