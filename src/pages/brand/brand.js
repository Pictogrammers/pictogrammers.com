import { createElement } from 'lwc';

import BrandGuidelines from 'pg/brand';

const app = createElement('pg-brand', { is: BrandGuidelines });

// eslint-disable-next-line @lwc/lwc/no-document-query
document.getElementById('root').appendChild(app);
