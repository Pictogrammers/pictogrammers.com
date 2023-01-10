import { IconLibraries } from '../interfaces/icons';

export interface DocData {
  // Use of any because literally anything can be put into front matter
  [key: string]: any;
}

export interface Doc {
  availableIcons: IconLibraries;
  category: any;
  content: string;
  data: DocData;
  disabled?: boolean;
  icon?: string;
  iconPath?: string;
  landingPage?: boolean;
  library: any;
  readingTime?: string;
  slug: string;
  toc: object[];
}

export interface DocCategory {
  description: string;
  icon: string;
  id: string;
  name: string;
}
