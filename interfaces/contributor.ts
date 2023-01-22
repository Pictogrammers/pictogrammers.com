export interface ContributorProps {
  authorLibraries?: string[];
  core: boolean;
  description?: string;
  github: string;
  iconCount: number;
  id: string;
  name: string;
  image?: boolean;
  sponsored: boolean;
  twitter?: string;
  website?: string;
}

export interface ContributorsMdxProps {
  view?: 'core' | 'community' | 'all' | 'single';
  name?: string;
  id?: string;
}
