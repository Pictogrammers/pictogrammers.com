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
  cp: string;
  n: string;
  p: string;
  a: string;
  v: string;
  st: string[];
}

export interface MdxIconProps {
  name: string;
  path?: string;
  size?: number;
  availableIcons?: IconLibraries;
}
