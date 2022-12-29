import { CategoryProps } from '../hooks/useCategories';

export interface IconLibraries {
  [key: string]: {
    [key: string]: any; // 'any' used to solve descrenpencies with third-party libraries
  };
}

export interface IconLibrary {
  description: string;
  featured?: boolean;
  git: string;
  gridSize: number;
  id: string;
  image: string;
  name: string;
  package: string;
  shortName: string;
}

export interface IconLibraryIcon {
  a: string;
  al: string[];
  categories?: CategoryProps[];
  cp: string;
  n: string;
  p: string;
  st: string[];
  t: string[];
  v: string;
}

export interface MdxIconProps {
  name: string;
  path?: string;
  size?: number;
  availableIcons?: IconLibraries;
}
