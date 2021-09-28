import { LightningElement } from 'lwc';

export default class About extends LightningElement {
  contributors = [];

  constructor() {
    super();
    this.getCoreContributors();
  }

  async getCoreContributors() {
    try {
      // TODO: Replace this with a call to the MDI API
      const results = await fetch('/resources/contributors.json');
      const contributors = await results.json();

      this.contributors = contributors
        .filter((contributor) => !!contributor.core)
        .map((contributor) => {
          contributor.imageUri = `data:image/png;base64,${contributor.base64}`;
          return contributor;
        });
    } catch (err) {
      console.error(err);
    }
  }
}
