export interface ContributorProps {
  authorLibraries?: string[];
  avatar?: string;
  contributedRepos: string[];
  core: boolean;
  description?: string;
  github: string;
  iconCount: number;
  id: string;
  links: {
    type: string;
    value: string;
  }[];
  name: string;
  sponsorable: boolean;
}

export interface ContributorsMdxProps {
  filtered?: string[];
  view?: 'core' | 'community' | 'all' | 'single';
  name?: string;
  id?: string;
}
