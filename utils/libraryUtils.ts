import fs from 'node:fs/promises';
import { join } from 'node:path';
import getConfig from 'next/config';
import slugify from 'slugify';

import { IconLibrary, IconLibraryIcon } from '../interfaces/icons';
import { ContributorProps } from '../interfaces/contributor';
import { CategoryProps } from '../hooks/useCategories';

import allContributors from '../public/data/contributors.json';

const { publicRuntimeConfig: config } = getConfig();
const { libraries: { icons: iconLibraries = [] } } = config;

interface SlugInterface {
  contributorSlugs: string[];
  iconSlugs: string[];
  versionSlugs: string[];
}

export const getAllLibraryPaths = async () => {
  const allIcons = await iconLibraries.reduce(async (prevPromise: Promise<string[]>, library: IconLibrary) => {
    let output = await prevPromise;

    if (library.unreleased) {
      return output;
    }

    const { i: icons, t: categories } = JSON.parse(await fs.readFile(join(process.cwd(), `public/data/${library.id}-${library.version}.json`), 'utf-8'));
    const { contributorSlugs, iconSlugs, versionSlugs } = icons.reduce((output: SlugInterface, icon: IconLibraryIcon) => {
      output.iconSlugs.push(`${library.id}/icon/${icon.n}`);

      const versionSlug = `${library.id}/version/${icon.v}`;
      if (!output.versionSlugs.includes(versionSlug)) {
        output.versionSlugs.push(versionSlug);
      }

      const contributor = allContributors.contributors.find((contributor: ContributorProps) => contributor.id === icon.a);
      if (contributor) {
        const contributorSlug = `${library.id}/author/${slugify(contributor.github)}`;
        if (!output.contributorSlugs.includes(contributorSlug)) {
          output.contributorSlugs.push(contributorSlug);
        }
      }

      return output;
    }, { contributorSlugs: [], iconSlugs: [], versionSlugs: [] });

    const categorySlugs = categories.map((category: CategoryProps) => `${library.id}/category/${category.slug}`);

    output = [
      ...output,
      ...versionSlugs,
      ...categorySlugs,
      ...contributorSlugs,
      ...iconSlugs,
      `${library.id}/deprecated`,
      `${library.id}/history`
    ];
    return output;
  }, Promise.resolve([]));

  const libraries = iconLibraries.reduce((output: any[], library: IconLibrary) => {
    if (!library.unreleased) {
      output.push(library.id);
    }
    return output;
  }, []);

  return [ ...libraries, ...allIcons ];
};

export const getIcon = async (library: string, icon: string): Promise<IconLibraryIcon> => {
  const libraryMeta = iconLibraries.find((lib: IconLibrary) => lib.id === library);
  const { i: icons, t: iconCategories } = JSON.parse(await fs.readFile(join(process.cwd(), `public/data/${library}-${libraryMeta.version}.json`), 'utf-8'));
  const iconInfo = icons.find((i: IconLibraryIcon) => i.n === icon);

  // Add some extra metadata
  const categories = iconInfo.t.map((tag: number) => ({ id: tag, ...iconCategories[tag] }));
  const relatedIcons = icons.filter((i: IconLibraryIcon) => (
    iconInfo.n !== i.n && ( // Ignore myself
      iconInfo.b && (iconInfo.b === i.n) || // My base icon
      iconInfo.b && (iconInfo.b === i.b) || // My base icon's related icons
      iconInfo.n === i.b // My related icons
    )
  ));

  return { ...iconInfo, categories, relatedIcons };
};
