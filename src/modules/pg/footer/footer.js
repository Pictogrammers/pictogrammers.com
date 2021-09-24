import { LightningElement, api } from 'lwc';
import { mdiGithub, mdiTwitter } from '@mdi/js';

export default class Footer extends LightningElement {
  @api year = new Date().getFullYear();

  iconExportMapping = {
    mdiGithub,
    mdiTwitter
  };

  get icon() {
    return this.iconExportMapping;
  }
}
