export interface TableOfContentsItemProps {
  lvl: number;
  slug: string;
  content: string;
}

export interface TableOfContentsProps {
  toc: Array<TableOfContentsItemProps>;
}
