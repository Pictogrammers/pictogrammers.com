export interface IDoc {
  category?: string;
  description: string;
  hidden?: boolean;
  library?: string;
  prerequisites: string[]; // TODO: Placeholder component
  readingTime?: string;
  slug: string;
  stacks: string[]; // TODO: Placeholder component
  title: string;
}
