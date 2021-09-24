import { LightningElement } from 'lwc';
import { mdiArrowDownCircle } from '@mdi/js';

export default class Hero extends LightningElement {
  iconExportMapping = {
    mdiArrowDownCircle
  };

  get icon() {
    return this.iconExportMapping;
  }

  scrollTo(event) {
    this.dispatchEvent(new CustomEvent('scroll_to', {
      detail: {
        location: event.target.href.split('#')[1]
      }
    }));
  }
}
