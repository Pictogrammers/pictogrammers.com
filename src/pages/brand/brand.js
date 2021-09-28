import { createElement } from 'lwc';

import BrandGuidelines from 'pages/brand';

const brand = createElement('pages-brand', { is: BrandGuidelines });

// eslint-disable-next-line @lwc/lwc/no-document-query
document.getElementById('root').appendChild(brand);
