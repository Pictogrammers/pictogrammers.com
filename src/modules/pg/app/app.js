import { LightningElement } from 'lwc';

export default class App extends LightningElement {
  scrollTo(event) {
    this.template.querySelector(`pg-${event.detail.location}`).scrollIntoView({ behavior: 'smooth' });
  }

  renderedCallback() {
    this.template.querySelector('pg-header').addEventListener('scroll_to', this.scrollTo.bind(this));
    this.template.querySelector('pg-hero').addEventListener('scroll_to', this.scrollTo.bind(this));

    if (window.location.hash) {
      setTimeout(() => {
        this.scrollTo({
          detail: {
            location: window.location.hash.substring(1)
          }
        });
      }, 500);
    }
  }
}
