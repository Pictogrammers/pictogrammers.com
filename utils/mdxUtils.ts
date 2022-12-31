import fs from 'node:fs';
import { join } from 'node:path';
import glob from 'glob';
import matter from 'gray-matter';
import toc from 'markdown-toc';
import readingTime from 'reading-time';

import handleImportStatements from './helpers/handleImportStatements';
import handleVersionReplacements from './helpers/handleVersionReplacements';
import getUsedIcons from './helpers/getUsedIcons';

import { Doc, DocData } from '../interfaces/doc';

const DOCS_PATH = join(process.cwd(), 'docs');
const getDocPaths = (): string[] => glob.sync('**/*.mdx', { cwd: DOCS_PATH });

export const getDoc = (slug: string): Doc => {
  const docPath = join(DOCS_PATH, `${slug}.mdx`);
  const docContents = fs.readFileSync(docPath, 'utf-8');
  const { content, data } = matter(docContents);

  const processedContent = handleVersionReplacements(handleImportStatements(content, DOCS_PATH));

  const { text: articleReadTime } = readingTime(processedContent);
  const docToc = toc(processedContent).json;
  const availableIcons = getUsedIcons(processedContent);

  return {
    availableIcons,
    content: processedContent,
    data,
    readingTime: articleReadTime,
    toc: docToc
  };
};

export const getDocItems = (filePath: string, fields: string[] = []): DocData => {
  const slug = filePath.replace(/\.mdx?$/, '');
  const { content, data } = getDoc(slug);

  if (
    // Disable any MDX file that does not contain front matter
    !Object.keys(data).length ||
    // Disable any MDX that explicitly defines to
    data?.disabled === true
  ) {
    return { disabled: true };
  }

  const items = fields.reduce((output, field) => {
    output[field] = field === 'slug' ? slug : field === 'content' ? content : data[field];
    return output;
  }, {} as DocData);

  return items;
};

export const getAllDocs = (fields: string[]): DocData[] => {
  const filePaths = getDocPaths();
  const posts = filePaths.reduce((output, filePath) => {
    const docItems = getDocItems(filePath, fields);
    if (docItems?.disabled !== true) {
      output.push(docItems);
    }
    return output;
  }, [] as DocData[]);
  return posts;
};
