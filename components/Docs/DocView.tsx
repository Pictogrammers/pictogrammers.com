import { FunctionComponent } from 'react';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ButtonProps } from '@mui/material/Button';

import { DocCategory, DocData } from '../../interfaces/doc';
import { TableOfContentsItemProps } from '../../interfaces/tableOfContents';
import { IconLibraries, IconLibrary, MdxIconProps } from '../../interfaces/icons';

import Head from '../../components/Head/Head';
import Layout from '../../components/Docs/Layout/Layout';
import Contributors from '../../components/Docs/Contributors/Contributors';
import Heading from '../../components/Docs/Heading';
import CodeHighlighter from '../../components/CodeHighlighter/CodeHighlighter';
import Icon from '../../components/Docs/Icon';
import Button from '../../components/Docs/Button';
import Note from '../../components/Docs/Note';
import { Tab, Tabs } from '../../components/Docs/Tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow
} from '../../components/Docs/Table';

interface DocViewProps {
  availableIcons: IconLibraries;
  category: DocCategory;
  frontMatter: DocData;
  library: IconLibrary;
  readingTime?: string;
  slug: string;
  source: MDXRemoteSerializeResult;
  toc: Array<TableOfContentsItemProps>;
}

interface IButton extends ButtonProps {
  href: string;
}

const DocView: FunctionComponent<DocViewProps> = ({ availableIcons, category, frontMatter, library, readingTime, slug, source, toc }) => {
  const path = `docs/${slug}`;
  const { description, hidden, title } = frontMatter;

  const breadcrumbs = [ <Link key='docs' href='/docs/'>Docs</Link> ];
  if (library?.id) {
    breadcrumbs.push(<Link href={`/docs/#${library.id}`} key='library'>{library.name}</Link>);
  }
  if (category?.id) {
    breadcrumbs.push(<Link href={`/docs${library?.id ? `/library/${library.id}` : ''}/${category.id}`} key='category'>{category.name}</Link>);
  }

  return (
      <Layout
        breadcrumbs={breadcrumbs}
        improvePage={{
          gitHubUrl: `https://github.com/Pictogrammers/pictogrammers.com/blob/main/${path}.mdx`,
          suggestUrl: `https://github.com/Pictogrammers/pictogrammers.com/issues/new?title=${encodeURIComponent(`Suggested Change to "${title}"`)}&body=${encodeURIComponent(`*URL:* https://pictogrammers.com/${path}\n\n<!-- Describe how you would improve the page here -->`)}`
        }}
        title={title}
        toc={toc}
      >
        <Head
          description={description}
          noIndex={hidden}
          readingTime={readingTime}
          title={`${title} - Docs`}
          type='article'
        />
        <MDXRemote
          components={{
            Button: (props: IButton) => Button({...props, availableIcons }),
            code: CodeHighlighter,
            Contributors,
            h1: Heading(1),
            h2: Heading(2),
            h3: Heading(3),
            h4: Heading(4),
            h5: Heading(5),
            h6: Heading(6),
            Icon: (props: MdxIconProps) => Icon({...props, availableIcons }),
            Note,
            Tab,
            table: Table,
            Tabs,
            tbody: TableBody,
            td: TableCell,
            tfoot: TableFooter,
            th: TableCell,
            thead: TableHead,
            tr: TableRow
          } as any}
          {...source}
        />
      </Layout>
  );
};

export default DocView;