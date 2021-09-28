import { LightningElement } from 'lwc';
import { mdiArrowDown } from '@mdi/js';

export default class Brand extends LightningElement {
  iconExportMapping = {
    mdiArrowDown
  };

  get icon() {
    return this.iconExportMapping;
  }
}
