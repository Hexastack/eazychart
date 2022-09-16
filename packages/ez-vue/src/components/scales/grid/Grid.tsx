import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Direction } from 'eazychart-core/src/types';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';
import GridLines from './GridLines';

@Component
export default class Grid extends Vue {
  @Prop({
    type: Array,
    default() {
      return [Direction.HORIZONTAL, Direction.VERTICAL];
    },
  })
  private readonly directions!: Direction[];

  @Prop({
    type: Object as PropType<ScaleBand | ScaleLinear>,
    required: true,
  })
  private readonly xScale!: ScaleBand | ScaleLinear;

  @Prop({
    type: Object as PropType<ScaleBand | ScaleLinear>,
    required: true,
  })
  private readonly yScale!: ScaleBand | ScaleLinear;

  @Prop({
    type: String,
    default: '#a8a8a8',
  })
  private readonly color!: string;

  render() {
    const {
      directions, color, xScale, yScale,
    } = this;

    if (!directions || directions.length === 0) {
      return null;
    }

    return (
      <g class="ez-grid">
        {directions.includes(Direction.HORIZONTAL) && (
          <GridLines
            direction={Direction.HORIZONTAL}
            aScale={yScale}
            color={color}
          />
        )}
        {directions.includes(Direction.VERTICAL) && (
          <GridLines
            direction={Direction.VERTICAL}
            aScale={xScale}
            color={color}
          />
        )}
      </g>
    );
  }
}
