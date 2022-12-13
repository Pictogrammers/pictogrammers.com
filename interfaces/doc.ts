import { IconLibraries } from '../interfaces/icons';

export interface DocData {
  // Use of any because literally anything can be put into front matter
  [key: string]: any;
}

export interface Doc {
  availableIcons: IconLibraries;
  content: string;
  data: DocData;  
  readingTime?: string;
  toc: object[];
}