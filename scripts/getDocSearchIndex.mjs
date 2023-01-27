import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import glob from 'fast-glob';
import matter from 'gray-matter';
import { markdownToTxt } from 'markdown-to-txt';

import config from '../config.js';

const DOCS_PATH = join(process.cwd(), 'docs');

const getSlugPieces = (slug) => {
  const slugPieces = slug.split('/');
  if (slugPieces[0] === 'library') {
    return {
      category: slugPieces[2],
      library: slugPieces[1],
      rest: [ ...slugPieces.slice(3) ].join('/')
    };
  }

  return {
    category: slugPieces[0],
    rest: [ ...slugPieces.slice(1) ].join('/')
  };
};

const getDocSearchIndex = async () => {
  console.log('INFO: Creating documentation search index...');

  const docPaths = await glob('**/*.mdx', { cwd: DOCS_PATH, onlyFiles: true });

  const output = await docPaths.reduce(async (prevPromise, docPath) => {
    const output = await prevPromise;

    const { category, library, rest } = getSlugPieces(docPath);
    const { docs: { categories }, libraries } = config;

    const categoryInfo = categories.find((c) => c.id === category);
    const libraryInfo = libraries.icons.find((l) => l.id === library) || libraries.fonts.find((l) => l.id === library) || {};

    const docContents = await readFile(join(DOCS_PATH, docPath), 'utf-8');
    const { content, data } = matter(docContents);

    if (
      // Disable any MDX file that does not contain required front matter
      !(data?.title && data?.description) ||
      // Disable any MDX that explicitly defines to
      data?.disabled === true ||
      // Hide any MDX that explicity defines to
      data?.hidden === true
    ) {
      return output;
    }

    output.push({
      category: categoryInfo?.name,
      content: markdownToTxt(content),
      description: data.description,
      library: libraryInfo?.name,
      slug: docPath.replace('.mdx', ''),
      title: data.title
    });

    return output;
  }, Promise.resolve([]));

  await writeFile('./public/data/docs.json', JSON.stringify(output), { flag: 'w' });
};

export default getDocSearchIndex;