import fs from 'node:fs/promises';
import { join } from 'node:path';
import getConfig from 'next/config';

import { IconLibraries, IconLibraryIcon } from '../interfaces/icons';

const { publicRuntimeConfig: config } = getConfig();
const { libraries: { icons: iconLibraries = [] } } = config;

export const getAllIconPaths = async (fields: string[]) => {
  const allIcons = await iconLibraries.reduce(async (prevPromise: Promise<string[]>, library: IconLibraries) => {
    let output = await prevPromise;

    const { i: icons } = JSON.parse(await fs.readFile(join(process.cwd(), `public/libraries/${library.id}.json`), 'utf-8'));
    const iconSlugs = icons.map((icon: IconLibraryIcon) => `${library.id}/${icon.n}`);

    output = [ ...output, ...iconSlugs ];
    return output;
  }, Promise.resolve([]));

  const libraries = iconLibraries.map((library: IconLibraries) => library.id);

  return [ ...libraries, ...allIcons ];
};

export const getIcon = async (library: string, icon: string): Promise<IconLibraryIcon> => {
  const { i: icons } = JSON.parse(await fs.readFile(join(process.cwd(), `public/libraries/${library}.json`), 'utf-8'));
  const iconInfo = icons.find((i: IconLibraryIcon) => i.n === icon);
  return iconInfo;
};
