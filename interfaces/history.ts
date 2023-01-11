export interface IconChangeRecord {
  date: string;
  icon: {
    data: string;
    id: string;
    name: string;
    user: {
      github: string;
      id: string;
      name: string;
    }
  },
  iconDataAfter?: string;
  iconDataBefore?: string;
  iconDescriptionAfter?: string;
  iconDescriptionBefore?: string;
  iconNameAfter?: string;
  iconNameBefore?: string;
  id: string;
  issue?: Number;
  modificationId: string;
  packageId: string;
  text?: string;
  type: string;
  user: {
    github: string;
    id: string;
    name: string;
  }
};
