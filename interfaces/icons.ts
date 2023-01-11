import { CategoryProps } from '../hooks/useCategories';

export interface IconLibraries {
  [key: string]: {
    [key: string]: any; // 'any' used to solve descrenpencies with third-party libraries
  };
}

export interface IconLibrary {
  description: string;
  exampleTypes: string[];
  featured?: boolean;
  git: string;
  gridSize: number;
  id: string;
  image: string;
  name: string;
  package: string;
  packageId: string;
  shortName: string;
}

export interface IconLibraryIcon {
  a: string; // Author
  al: string[]; // Aliases
  categories?: CategoryProps[]; // Categories
  cp: string; // Codepoint
  n: string; // Name
  p: string; // Path
  st: string[]; // Search Terms (Combined Index)
  t: string[]; // Tags
  v: string; // Version
}

export interface MdxIconProps {
  name: string;
  path?: string;
  size?: number;
  availableIcons?: IconLibraries;
}
