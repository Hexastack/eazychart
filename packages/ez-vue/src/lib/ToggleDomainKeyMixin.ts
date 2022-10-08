import Vue from 'vue';
import Component from 'vue-class-component';
import { RawData } from 'eazychart-core/src/types';
import { getDomainByKeys } from 'eazychart-core/src';

@Component
export default class ToggleDomainKeyMixin extends Vue {
  public activeDomainKeys: string[] = [];

  get activeDomain() {
    return getDomainByKeys(this.activeDomainKeys, this.getData());
  }

  toggleDomainKey(key: string, isActive: boolean, _color: string) {
    if (isActive) {
      this.activeDomainKeys = [...this.activeDomainKeys, key];
    } else {
      this.activeDomainKeys = this.activeDomainKeys.filter((domainKey) => domainKey !== key);
    }
  }

  mounted() {
    this.activeDomainKeys = this.getDomainKeys();
  }

  getData(): RawData {
    throw new Error(
      'The component using the mixin should implement the getData() getter',
    );
  }

  getDomainKeys(): string[] {
    throw new Error(
      'The component using the mixin should implement the getDomainKeys() getter',
    );
  }
}
