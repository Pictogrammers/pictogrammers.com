import { LightningElement } from 'lwc';
import { mdiGithub } from '@mdi/js';

export default class Header extends LightningElement {
  iconExportMapping = {
    mdiGithub
  };

  get icon() {
    return this.iconExportMapping;
  }

  scrollTo(event) {
    this.dispatchEvent(
      new CustomEvent('scroll_to', {
        detail: {
          location: event.target.href.split('#')[1]
        }
      })
    );
  }
}
