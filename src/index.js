import { createElement } from 'lwc';

import Home from 'pages/home';

const home = createElement('pages-home', { is: Home });

// eslint-disable-next-line @lwc/lwc/no-document-query
document.getElementById('root').appendChild(home);
