import { createElement } from 'lwc';

import App from 'pg/app';

const app = createElement('pg-app', { is: App });

// eslint-disable-next-line @lwc/lwc/no-document-query
document.getElementById('root').appendChild(app);
