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
  unreleased?: boolean;
  version: string;
}

export interface IconLibraryIcon {
  a: string; // Author
  al: string[]; // Aliases
  b: string; // Base Icon Name
  categories?: CategoryProps[]; // Categories
  cp: string; // Codepoint
  d: boolean; // Deprecated
  n: string; // Name
  p: string; // Path
  relatedIcons?: IconLibraryIcon[]; // Related Icons
  st: string[]; // Search Terms (Combined Index)
  t: string[]; // Tags
  v: string; // Version
}

export interface IconCustomizationProps {
  bgColor: {
    a: number,
    b: number,
    g: number,
    r: number
  };
  cornerRadius: number;
  fgColor: {
    a: number,
    b: number,
    g: number,
    r: number
  };
  flipX: boolean;
  flipY: boolean;
  padding: number;
  rotate: number;
  size: number;
}

export interface MdxIconProps {
  name: string;
  path?: string;
  size?: number;
  availableIcons?: IconLibraries;
}
