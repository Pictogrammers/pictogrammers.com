import { Fragment } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import gfm from 'remark-gfm';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';
import { ButtonProps } from '@mui/material/Button';

import { DocData } from '../../interfaces/doc';
import { IconLibraries, MdxIconProps } from '../../interfaces/icons';
import { TableOfContentsItemProps } from '../../interfaces/tableOfContents';
import { getAllDocs, getDoc } from '../../utils/mdxUtils';

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
  const { availableIcons, content, data, readingTime, toc } = getDoc(slug.join('/'));
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [ gfm ]
    },
    scope: data
  });

  return {
    props: {
      availableIcons,
      frontMatter: data,
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
  frontMatter: DocData;
  readingTime?: string;
  slug: string;
  source: MDXRemoteSerializeResult;
  toc: Array<TableOfContentsItemProps>;
}

const DocsPage: NextPage<DocsPageProps> = ({ availableIcons, frontMatter, readingTime, slug, source, toc }) => {
  const path = `docs/${slug}`;
  const {
    category,
    description,
    hidden,
    library,
    title
  } = frontMatter;

  const pageTitle = `${title} - Docs - Pictogrammers`;

  // TODO: Break this into a helper and actually link things up
  const breadcrumbs = [ <Link key='docs' href='/docs/'>Docs</Link> ];
  if (library) {
    breadcrumbs.push(<span key='library'>{library}</span>);
  }
  if (category) {
    breadcrumbs.push(<span key='category'>{category}</span>);
  }

  return (
    <Fragment>
      <Head>
        <title>{pageTitle}</title>
        <meta content={pageTitle} name='title' key='title' />
        {description && <meta content={description} name='description' key='description' />}

        <meta content={pageTitle} property='og:title' key='og:title' />
        {description && <meta content={description} property='og:description' key='og:description' />}
        <meta content='article' property='og:type' key='og:type' />
        <meta content={`https://pictogrammers.com/${path}`} property='og:url' key='og:url' />

        <meta content={pageTitle} name='twitter:title' key='twitter:title' />
        {description && <meta content={description} name='twitter:description' key='twitter:description' />}
        {readingTime && <meta content='Reading Time' name='twitter:label1' key='twitter:label1' />}
        {readingTime && <meta content={readingTime} name='twitter:data1' key='twitter:data1' />}

        {hidden && <meta name='robots' content='noindex' />}
      </Head>
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
