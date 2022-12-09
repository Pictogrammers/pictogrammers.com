import fs from 'node:fs';
import { join } from 'node:path';
import glob from 'glob';
import matter from 'gray-matter';
import toc from 'markdown-toc';
import readingTime from 'reading-time';

const DOCS_PATH = join(process.cwd(), 'docs');

type Items = {
  [key: string]: string;
}

type Post = {
  data: {
    [key: string]: string;
  };
  content: string;
  toc: object[];
}

const getDocPaths = (): string[] => glob.sync('**/*.mdx', { cwd: DOCS_PATH });

export const getDoc = (slug: string): Post => {
  const docPath = join(DOCS_PATH, `${slug}.mdx`);
  const docContents = fs.readFileSync(docPath, 'utf-8');
  const { content, data } = matter(docContents);
  const { text: articleReadTime } = readingTime(content);
  const docToc = toc(content).json;
  data.readingTime = articleReadTime;
  return { content, data, toc: docToc };
};

export const getDocItems = (filePath: string, fields: string[] = []): Items => {
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
  }, {} as Items);

  return items;
};

export const getAllDocs = (fields: string[]): Items[] => {
  const filePaths = getDocPaths();
  const posts = filePaths.map((filePath) => getDocItems(filePath, fields));
  return posts;
};
