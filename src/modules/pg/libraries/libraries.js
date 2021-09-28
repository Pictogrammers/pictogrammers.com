import { LightningElement, api } from 'lwc';

const LIBRARIES = [
  {
    id: 'mdi',
    image: '/resources/mdi.svg',
    name: 'Material Design Icons',
    description: 'The original. Following Google’s Material Design guidelines for system icons, MDI is our largest library, touting over 6500 unique icons!',
    link: 'https://materialdesignicons.com/'
  },
  {
    id: 'mdl',
    image: '/resources/mdl.svg',
    name: 'Material Design Light',
    description: 'Taking a lighter spin on Google’s Material Design guidelines, MDL slims down icons to be modern, crisp, and clean.',
    link: 'https://github.com/Templarian/MaterialDesignLight'
  }
];

export default class Libraries extends LightningElement {
  @api libraries = LIBRARIES;
}
