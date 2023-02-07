import fs from 'node:fs/promises';
import { join } from 'node:path';
import getConfig from 'next/config';

import { IconLibrary, IconLibraryIcon } from '@/interfaces/icons';

import allContributors from '@/public/data/contributors.json';

const { publicRuntimeConfig: config } = getConfig();
const { libraries: { icons: iconLibraries = [] } } = config;

export const getAllContributorPaths = async () => {
  const paths = allContributors.contributors.map((contributor) => contributor.github);
  return paths;
};

export const getContributor = async (userId: string) => {
  const contributorInfo = allContributors.contributors.find((contributor) => contributor.github === userId);
  if (!contributorInfo) {
    return;
  }

  // Some contributors might not contribute icons, so if the count is zero
  // don't bother traversing the libraries looking for icons they created.
  if (contributorInfo.iconCount === 0) {
    return contributorInfo;
  }

  const authorLibraries = await iconLibraries.reduce(async (prevPromise: Promise<string[]>, library: IconLibrary) => {
    const output = await prevPromise;

    if (library.unreleased) {
      return output;
    }

    const { i: icons } = JSON.parse(await fs.readFile(join(process.cwd(), `public/data/${library.id}-${library.version}.json`), 'utf-8'));
    const authoredInLibrary = !!icons.find((icon: IconLibraryIcon) => icon.a === contributorInfo.id);

    if (authoredInLibrary) {
      output.push(library.id);
    }

    return output;
  }, Promise.resolve([]));

  return { ...contributorInfo, authorLibraries };
};
