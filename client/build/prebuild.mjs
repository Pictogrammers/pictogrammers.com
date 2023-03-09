import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import waitUntilApiReady from './waitUntilApiReady.mjs';
import getContributors from './getContributors.mjs';
import getDocSearchIndex from './getDocSearchIndex.mjs';
import getIconLibraries from './getIconLibraries.mjs';

// We need to turn off SSL verification and wait for
// services to be listening on dev to prebuild.
if (process.env.NODE_ENV !== 'production') {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  await waitUntilApiReady();
}

const contributors = await getContributors();
await getIconLibraries(contributors);
await getDocSearchIndex();
