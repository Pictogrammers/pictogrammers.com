import { LightningElement, api } from 'lwc';
import { mdiArrowRight } from '@mdi/js';

export default class LibraryCard extends LightningElement {
  @api name = "Untitled Library";
  @api description = null;
  @api image = null;
  @api link = null;

  iconExportMapping = {
    mdiArrowRight
  };

  get icon() {
    return this.iconExportMapping;
  }
}
