import { lstat, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import glob from 'fast-glob';
import matter from 'gray-matter';
import toc from 'markdown-toc';
import readingTime from 'reading-time';

import handleImportStatements from './helpers/handleImportStatements';
import handleVersionReplacements from './helpers/handleVersionReplacements';
import getUsedIcons from './helpers/getUsedIcons';

import { Doc } from '../interfaces/doc';

import config from '../config';

const DOCS_PATH = join(process.cwd(), 'docs');

const pathIsDir = async (path: string) => {
  try {
    const stat = await lstat(join(DOCS_PATH, path));
    return stat.isDirectory();
  } catch (err) {
    return false;
  }
};

const getSlugPieces = (slug: string) => {
  const slugPieces = slug.split('/');
  if (slugPieces[0] === 'library') {
    return {
      category: slugPieces[2],
      library: slugPieces[1]
    };
  }

  return {
    category: slugPieces[0]
  };
};

const getCategoriesAndLibraries = async () => {
  const { docs: { categories }, libraries } = config;
  const docPaths = await glob('**/*/', { cwd: DOCS_PATH, onlyDirectories: true });

  return docPaths
    .sort((a, b) => {
      const aPieces = getSlugPieces(a);
      const bPieces = getSlugPieces(b);
      const aCatIndex = categories.findIndex((c) => c.id === aPieces.category);
      const bCatIndex = categories.findIndex((c) => c.id === bPieces.category);
      const aLib = aPieces?.library || 'all';
      const bLib = bPieces?.library || 'all';
      return aLib.localeCompare(bLib) || aCatIndex - bCatIndex;
    })
    .reduce((output: any, docPath: string) => {
      const { category, library } = getSlugPieces(docPath);
      if (!category && !library) {
        return output;
      }

      const libraryId = library || 'all';
      if (!output[libraryId as keyof typeof output]) {
        const libraryInfo = libraries.icons.find((l) => l.id === libraryId) || libraries.fonts.find((l) => l.id === libraryId);
        output[libraryId] = { ...libraryInfo, categories: {} };
      }

      if (category && !output[libraryId].categories[category]) {
        const categoryInfo = categories.find((c) => c.id === category);
        if (categoryInfo) {
          output[libraryId].categories[category] = categoryInfo;
        }
      }

      return output;
    }, {});
};

const getDocPaths = async (pattern?: string | string[], includeDirectories: boolean = true) => {
  const globPattern = pattern ? pattern : ['**/*.mdx', '**/*/'];
  return glob(globPattern, {
    cwd: DOCS_PATH,
    markDirectories: includeDirectories,
    onlyFiles: !includeDirectories
  });
};

const getDoc = async (slug: string[]) => {
  const filePath = slug.join('/');
  const { category, library } = getSlugPieces(filePath);

  const { docs: { categories }, libraries } = config;
  const categoryInfo = categories.find((c) => c.id === category);
  const libraryInfo = libraries.icons.find((l) => l.id === library) || libraries.fonts.find((l) => l.id === library) || {};

  const isDirectory = await pathIsDir(filePath);
  if (isDirectory) {
    const dirDocPaths = await getDocPaths(`${filePath}/*.mdx`, false);

    const dirDocs = await dirDocPaths.reduce(async (prevPromise: Promise<object[]>, docPath: string) => {
      const output = await prevPromise;
      const doc = await getDoc(docPath.replace('.mdx', '').split('/')) as Doc;

      if (doc.data.hidden) {
        return output;
      }

      output.push({
        ...doc.data,
        slug: doc.slug
      });

      return output;
    }, Promise.resolve([]));

    return {
      category: categoryInfo,
      docs: dirDocs,
      landingPage: true,
      library: libraryInfo,
      slug
    };
  }

  const docContents = await readFile(join(DOCS_PATH, `${filePath}.mdx`), 'utf-8');
  const { content, data } = matter(docContents);

  if (
    // Disable any MDX file that does not contain required front matter
    !(data?.title && data?.description) ||
    // Disable any MDX that explicitly defines to
    data?.disabled === true
  ) {
    return { disabled: true };
  }

  const processedContent = handleVersionReplacements(handleImportStatements(content, DOCS_PATH));
  const { text: articleReadTime } = readingTime(processedContent);
  const docToc = toc(processedContent).json;
  const availableIcons = getUsedIcons(processedContent);

  return {
    availableIcons,
    category: categoryInfo,
    content: processedContent,
    data,
    library: libraryInfo,
    readingTime: articleReadTime,
    slug: filePath,
    toc: docToc
  } as Doc;
};

export {
  getDocPaths,
  getCategoriesAndLibraries,
  getDoc
};
