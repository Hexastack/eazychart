import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Direction } from 'eazychart-core/src/types';
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
    type: String,
    default: '#a8a8a8',
  })
  private readonly color!: string;

  render() {
    const { directions, color } = this;

    if (!directions || directions.length === 0) {
      return null;
    }

    return (
      <g class="ez-grid">
        {directions.includes(Direction.HORIZONTAL) && (
          <GridLines direction={Direction.HORIZONTAL} color={color} />
        )}
        {directions.includes(Direction.VERTICAL) && (
          <GridLines direction={Direction.VERTICAL} color={color} />
        )}
      </g>
    );
  }
}
