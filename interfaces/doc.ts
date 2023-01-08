import { IconLibraries } from '../interfaces/icons';

export interface DocData {
  // Use of any because literally anything can be put into front matter
  [key: string]: any;
}

export interface Doc {
  availableIcons: IconLibraries;
  category: string;
  content: string;
  data: DocData;
  library: string | null;
  readingTime?: string;
  toc: object[];
}