import getContributors from './getContributors.mjs';
import getIconLibraries from './getIconLibraries.mjs';

const contributors = await getContributors();
await getIconLibraries(contributors);
