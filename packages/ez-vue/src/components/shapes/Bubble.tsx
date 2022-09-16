import Vue, { PropType } from 'vue';
import Component from 'vue-class-component';
import { PointDatum } from 'eazychart-core/src/types';
import { defaultBubbleDatum } from 'eazychart-core/src';
import { Prop } from 'vue-property-decorator';
import Point from './Point';

@Component
export default class Bubble extends Vue {
  @Prop({
    type: Object as PropType<PointDatum>,
    default() {
      return defaultBubbleDatum;
    },
  })
  private readonly shapeDatum!: PointDatum;

  @Prop({
    type: String,
    default: null,
  })
  private readonly fill!: string;

  render() {
    const {
      shapeDatum,
      fill,
    } = this;
    return (
      <Point shapeDatum={shapeDatum} key={shapeDatum.id} r={shapeDatum.radius} fill={fill} />
    );
  }
}
