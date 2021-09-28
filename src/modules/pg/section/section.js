import { LightningElement, api } from 'lwc';
import cx from 'clsx';

export default class Section extends LightningElement {
  @api title = null;
  @api initialWave = false;
  @api highlight = false;

  get className() {
    return cx(
      this.initialWave && "wave",
      this.highlight && "highlight"
    );
  }
}
