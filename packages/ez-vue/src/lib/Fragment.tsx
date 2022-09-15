import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class Fragment extends Vue {
  @Prop({
    type: String,
    required: true,
  })
  private readonly type!: string;

  @Prop({
    type: String,
    required: true,
  })
  private readonly name!: string;

  render(h: Function) {
    const { type, name } = this;
    const DefaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default({})
      : null;
    return h(type, { attrs: { class: `ez-fragment-${name}` } }, DefaultSlot);
  }
}
