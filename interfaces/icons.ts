export interface IconLibraries {
  [key: string]: {
    [key: string]: any; // 'any' used to solve descrenpencies with third-party libraries
  };
}

export interface IconProps {
  name: string;
  path?: string;
  size?: number;
  availableIcons?: IconLibraries;
}