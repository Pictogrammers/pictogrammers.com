import { LightningElement, api } from 'lwc';
import cx from 'clsx';
import { mdiArrowDownCircle } from '@mdi/js';

export default class Hero extends LightningElement {
  @api fullHeight = false;
  @api showScrollCta = false;

  iconExportMapping = {
    mdiArrowDownCircle
  };

  get icon() {
    return this.iconExportMapping;
  }

  get className() {
    return cx(this.fullHeight && 'full');
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
