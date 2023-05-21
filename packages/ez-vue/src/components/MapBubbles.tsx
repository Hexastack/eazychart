import Vue from 'vue';
import Component from 'vue-class-component';
import { AnyScale, ChartContext, MapContext } from 'eazychart-core/src/types';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { ScaleSqrt, scaleMapBubbleData } from 'eazychart-core/src';
import Bubble from './shapes/Bubble';

@Component({ components: { Bubble } })
export default class Bubbles extends Vue {
  @InjectReactive('chart')
  private chart!: ChartContext;

  @InjectReactive('mapContext')
  private mapContext!: MapContext;

  @InjectReactive('colorScale')
  private colorScale!: AnyScale;

  @InjectReactive('sqrtScale')
  private rScale!: ScaleSqrt;

  @Prop({
    type: Number,
    required: true,
  })
  private readonly strokeWidth!: number;

  @Prop({
    type: Number,
    required: true,
  })
  private readonly opacity!: number;

  @Prop({
    type: String,
    required: true,
  })
  private readonly stroke!: string;

  @Prop({
    type: String,
    required: true,
  })
  private readonly geoDomainKey!: string;

  @Prop({
    type: String,
    required: true,
  })
  private readonly rDomainKey!: string;

  get shapeData() {
    const { chart, mapContext, colorScale } = this;
    const { mapData, projection } = mapContext;
    return scaleMapBubbleData(
      chart.data,
      mapData,
      this.geoDomainKey,
      this.rDomainKey,
      projection,
      this.rScale,
      colorScale,
    );
  }

  render() {
    const {
      shapeData, $scopedSlots, stroke, strokeWidth, opacity,
    } = this;

    if ($scopedSlots.default) {
      return (
        <g class="ez-map-bubbles">{$scopedSlots.default({ shapeData })}</g>
      );
    }

    return (
      <g class="ez-map-bubbles">
        {shapeData.map((shapeDatum) => (
          <Bubble
            shapeDatum={shapeDatum}
            key={shapeDatum.id}
            stroke={stroke}
            strokeWidth={strokeWidth}
            opacity={opacity}
          />
        ))}
      </g>
    );
  }
}
