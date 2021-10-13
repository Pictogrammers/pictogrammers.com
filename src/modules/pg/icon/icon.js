import { LightningElement, api } from 'lwc';

const DEFAULT_SIZE = 1;

export default class Icon extends LightningElement {
  _size = DEFAULT_SIZE;

  @api name = null;
  @api color = null;
  @api path = '';
  @api set size(value) {
    value = parseFloat(value);
    this._size = !isNaN(value) ? value : DEFAULT_SIZE;
  }

  get size() {
    return this._size;
  }

  get styles() {
    const styles = [
      `height:${this._size * 1.5}rem`,
      `width:${this._size * 1.5}rem`
    ];

    if (this.color) {
      styles.push(`color:${this.color}`);
    }

    return styles.join(';');
  }
}
