export interface IconLibraries {
  [key: string]: {
    [key: string]: any; // 'any' used to solve descrenpencies with third-party libraries
  };
}

export interface IconLibraryIcon {
  name: string;
  jsName: string;
  path: string;
  author: string;
  version: string;
}

export interface MdxIconProps {
  name: string;
  path?: string;
  size?: number;
  availableIcons?: IconLibraries;
}
