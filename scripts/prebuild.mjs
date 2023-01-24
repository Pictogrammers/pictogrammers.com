import * as dotenv from 'dotenv';
dotenv.config();

import getContributors from './getContributors.mjs';
import getDocSearchIndex from './getDocSearchIndex.mjs';
import getIconLibraries from './getIconLibraries.mjs';

const contributors = await getContributors();
await getIconLibraries(contributors);
await getDocSearchIndex();