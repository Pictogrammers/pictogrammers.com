import { Fragment } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import getConfig from 'next/config';
import Link from 'next/link';
import { serialize } from 'next-mdx-remote/serialize';
import gfm from 'remark-gfm';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';
import { ButtonProps } from '@mui/material/Button';

import { DocData } from '../../interfaces/doc';
import { IconLibraries, MdxIconProps } from '../../interfaces/icons';
import { TableOfContentsItemProps } from '../../interfaces/tableOfContents';
import { getAllDocs, getDoc } from '../../utils/docUtils';

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

interface IParams extends ParsedUrlQuery {
  slug: string[]
}

interface IButton extends ButtonProps {
  href: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const { availableIcons, category, content, data, library, readingTime, toc } = getDoc(slug.join('/'));
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [ gfm ]
    },
    scope: data
  });

  return {
    props: {
      availableIcons,
      category,
      frontMatter: data,
      library,
      readingTime,
      slug: slug.join('/'),
      source: mdxSource,
      toc
    }
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const docs = getAllDocs(['slug']);
  const paths = docs.map((doc) => ({
    params: {
     slug: doc.slug.split('/')
    }
  }));

  return {
    fallback: false,
    paths
  };
};

interface DocsPageProps {
  availableIcons: IconLibraries;
  category: string;
  frontMatter: DocData;
  library: string | null;
  readingTime?: string;
  slug: string;
  source: MDXRemoteSerializeResult;
  toc: Array<TableOfContentsItemProps>;
}

const DocsPage: NextPage<DocsPageProps> = ({ availableIcons, category, frontMatter, library, readingTime, slug, source, toc }) => {
  const { publicRuntimeConfig: { docs: { categories }, libraries } } = getConfig();

  const path = `docs/${slug}`;
  const { description, hidden, title } = frontMatter;

  // TODO: Break this into a helper and actually link things up
  const breadcrumbs = [ <Link key='docs' href='/docs/'>Docs</Link> ];
  if (library) {
    breadcrumbs.push(<Link href={`/docs/#${library}`} key='library'>{libraries.icons.find((l: any) => l.id === library)?.name}</Link>);
  }
  if (category) {
    breadcrumbs.push(<Link href={`/docs${library ? `/library/${library}` : ''}/${category}`} key='category'>{categories.find((c: any) => c.id === category)?.name}</Link>);
  }

  return (
    <Fragment>
      <Head
        description={description}
        noIndex={hidden}
        readingTime={readingTime}
        title={`${title} - Docs`}
        type='article'
      />
      <Layout
        breadcrumbs={breadcrumbs}
        improvePage={{
          gitHubUrl: `https://github.com/Pictogrammers/pictogrammers.com/blob/main/${path}.mdx`,
          suggestUrl: `https://github.com/Pictogrammers/pictogrammers.com/issues/new?title=${encodeURIComponent(`Suggested Change to "${title}"`)}&body=${encodeURIComponent(`*URL:* https://pictogrammers.com/${path}\n\n<!-- Describe how you would improve the page here -->`)}`
        }}
        title={title}
        toc={toc}
      >
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
    </Fragment>
  );
};

export default DocsPage;
