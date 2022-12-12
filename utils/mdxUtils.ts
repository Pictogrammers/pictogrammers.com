import fs from 'node:fs';
import { join } from 'node:path';
import glob from 'glob';
import matter from 'gray-matter';
import toc from 'markdown-toc';
import readingTime from 'reading-time';

import * as mdi from '@mdi/js';
import * as mdil from '@mdi/light-js';
import * as si from 'simple-icons';

import { IconLibraries } from '../interfaces/icons';

const DOCS_PATH = join(process.cwd(), 'docs');

type Doc = {
  data: {
    [key: string]: string;
  };
  content: string;
  toc: object[];
  availableIcons: IconLibraries;
}

type DocItems = {
  [key: string]: string;
}

const libraries: IconLibraries = {
  mdi, mdil, si
};

const getDocPaths = (): string[] => glob.sync('**/*.mdx', { cwd: DOCS_PATH });

export const getDoc = (slug: string): Doc => {
  const docPath = join(DOCS_PATH, `${slug}.mdx`);
  const docContents = fs.readFileSync(docPath, 'utf-8');
  const { content, data } = matter(docContents);
  const { text: articleReadTime } = readingTime(content);
  const docToc = toc(content).json;
  data.readingTime = articleReadTime;

  const availableIcons = [...content.matchAll(/(mdi|mdil|si):([a-z0-9-]+)/g)].reduce((output: IconLibraries, icon) => {
    const [ , library, iconSlug ] = icon;

    if (output[library][iconSlug]) {
      return output;
    }

    const iconPascal = iconSlug.split('-').map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join('');
    const iconId = `${library}${iconPascal}`;

    if (library === 'si') {
      output[library][iconSlug] = libraries?.[library]?.[iconId].path || '';
      return output;
    }

    output[library][iconSlug] = libraries?.[library]?.[iconId] || '';
    return output;
  }, { mdi: {}, mdil: {}, si: {} });
  
  return { availableIcons, content, data, toc: docToc };
};

export const getDocItems = (filePath: string, fields: string[] = []): DocItems => {
  const slug = filePath.replace(/\.mdx?$/, '');
  const { content, data } = getDoc(slug);

  const items = fields.reduce((output, field) => {
    if (field === 'slug'){
      output[field] = slug;
      return output;
    }
    
    if (field === 'content'){
      output[field] = content;
      return output;
    }
    
    if (data[field]){
      output[field] = data[field];
      return output;
    }

    return output;
  }, {} as DocItems);

  return items;
};

export const getAllDocs = (fields: string[]): DocItems[] => {
  const filePaths = getDocPaths();
  const posts = filePaths.map((filePath) => getDocItems(filePath, fields));
  return posts;
};
