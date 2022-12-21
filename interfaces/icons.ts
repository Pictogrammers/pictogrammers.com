export interface IconLibraries {
  [key: string]: {
    [key: string]: any; // 'any' used to solve descrenpencies with third-party libraries
  };
}

export interface IconLibraryIcon {
  cp: string;
  n: string;
  p: string;
  a: string;
  v: string;
}

export interface MdxIconProps {
  name: string;
  path?: string;
  size?: number;
  availableIcons?: IconLibraries;
}
