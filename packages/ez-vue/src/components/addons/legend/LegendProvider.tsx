import Vue from 'vue';
import Component from 'vue-class-component';
import Fragment from '@/lib/Fragment';

@Component
export default class LegendProvider extends Vue {
  render() {
    const DefaultSlot = this.$scopedSlots.default
      ? this.$scopedSlots.default({})
      : null;
    const LegendOverride = this.$scopedSlots.Legend
      ? this.$scopedSlots.Legend({})
      : null;
    return (
      <Fragment type="div" name="filter" ref="legendFragment">
        {DefaultSlot}
        {LegendOverride}
      </Fragment>
    );
  }
}
