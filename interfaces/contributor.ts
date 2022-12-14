export interface ContributorProps {
  base64?: string;
  core: boolean;
  description: string;
  github: string;
  iconCount: number;
  id: string;
  name: string;
  noImage?: boolean;
  sponsored: boolean;
  twitter?: string;
  website?: string;
}

export interface ContributorsMdxProps {
  contributors: {
    contributors: ContributorProps[];
    totalContributors: number;
  }
  view?: 'core' | 'community' | 'all' | 'single';
  id?: string;
}
