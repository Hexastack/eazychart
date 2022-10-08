import Vue from 'vue';
import Component from 'vue-class-component';
import { RawData } from 'eazychart-core/src/types';

@Component
export default class ToggleDatumMixin extends Vue {
  private excludedKeys: { [key: string]: string } = {};

  get activeData() {
    const domainKey = this.getDomainKey();
    return this.getData().filter((datum) => !((datum[domainKey] as string) in this.excludedKeys));
  }

  get activeColors() {
    return this.getColors().filter((color) => !Object.values(this.excludedKeys).includes(color));
  }

  toggleDatum(key: string, isActive: boolean, color: string) {
    if (isActive) {
      // eslint-disable-next-line
      const { [key]: _removed, ...newExcludedKeys } = this.excludedKeys;
      this.excludedKeys = newExcludedKeys;
    } else {
      this.excludedKeys = { ...this.excludedKeys, [key]: color };
    }
  }

  getData(): RawData {
    throw new Error(
      'The component using the mixin should implement the getData() getter',
    );
  }

  getColors(): string[] {
    throw new Error(
      'The component using the mixin should implement the getColors() getter',
    );
  }

  getDomainKey(): string {
    throw new Error(
      'The component using the mixin should implement the getDomainKey() getter',
    );
  }
}
