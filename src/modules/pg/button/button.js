import { LightningElement, api } from 'lwc';
import cx from 'clsx';

export default class Button extends LightningElement {
  @api href = null;
  @api startIcon = null;
  @api endIcon = null;
  @api invert = false;

  get className() {
    return cx(this.invert && "invert");
  }
}
