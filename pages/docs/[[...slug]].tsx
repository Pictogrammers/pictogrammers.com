import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import gfm from 'remark-gfm';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';

import { Icon as MDIIcon } from '@mdi/react';
import { mdiGithub, mdiTextBoxPlus } from '@mdi/js';

import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { IDoc } from '../../interfaces/doc';
import { TableOfContentsItemProps } from '../../interfaces/tableOfContents';
import { getAllDocs, getDoc } from '../../utils/mdxUtils';

import TableOfContents from '../../components/Docs/TableOfContents';
import Heading from '../../components/Docs/Heading';
import Code from '../../components/Docs/Code';
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

import classes from '../../styles/pages/docs.module.scss';

interface Iparams extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Iparams;
  const { content, data, toc } = getDoc(slug.join('/'));
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [ gfm ]
    },
    scope: data
  });

  return {
    props: {
      frontMatter: data,
      slug: slug.join('/'),
      source: mdxSource,
      toc
    }
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllDocs(['slug']);
  const paths = posts.map((post) => ({
    params: {
     slug: post.slug.split('/')
    }
  }));

  return {
    fallback: false,
    paths
  };
};

type Props = {
  frontMatter: Omit<IDoc, 'slug'>;
  slug: string;
  source: MDXRemoteSerializeResult;
  toc: Array<TableOfContentsItemProps>;
}

const PostPage: NextPage<Props> = ({ frontMatter, slug, source, toc }: Props) => {
  const path = `docs/${slug}`;
  const {
    category,
    description,
    hidden,
    library,
    readingTime,
    title
  } = frontMatter;

  return (
    <div className={classes.root}>
      <Head>
        <title>{`${title} - Docs - Pictogrammers`}</title>
        <meta content={`${title} - Docs - Pictogrammers`} name='title' key='title' />
        {description && <meta content={description} name='description' key='description' />}

        <meta content={`${title} - Docs - Pictogrammers`} property='og:title' key='og:title' />
        {description && <meta content={description} property='og:description' key='og:description' />}
        <meta content='article' property='og:type' key='og:type' />
        <meta content={`https://pictogrammers.com/${path}`} property='og:url' key='og:url' />

        <meta content={`${title} - Docs - Pictogrammers`} name='twitter:title' key='twitter:title' />
        {description && <meta content={description} name='twitter:description' key='twitter:description' />}
        {readingTime && <meta content='Reading Time' name='twitter:label1' key='twitter:label1' />}
        {readingTime && <meta content={readingTime} name='twitter:data1' key='twitter:data1' />}

        {hidden && <meta name='robots' content='noindex' />}
      </Head>
      <Paper className={classes.container}>
        <article className={classes.main} role='main'>
          <Breadcrumbs
            aria-label='breadcrumb'
            classes={{
              ol: classes.breadcrumb
            }}
          >
            <Link href='/docs/'>Docs</Link>
            {library && <span>{library}</span>}
            {category && <span>{category}</span>}
          </Breadcrumbs>
          <h1>{title}</h1>
          <div className={classes.content}>
            <MDXRemote
              components={{
                Button,
                code: Code,
                h1: Heading(1),
                h2: Heading(2),
                h3: Heading(3),
                h4: Heading(4),
                h5: Heading(5),
                h6: Heading(6),
                Icon,
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
          </div>
        </article>
        <aside>
            <div className={classes.sidenav}>
              <TableOfContents toc={toc} />
              <div className={classes.edits}>
                <p className={classes.improvehead}>Improve This Article</p>
                <Button
                  color='secondary'
                  fullWidth
                  href={`https://github.com/Pictogrammers/pictogrammers.com/blob/main/${path}.md`}
                  startIcon={<MDIIcon path={mdiGithub} size={1} />}
                  variant='outlined'
                >
                  Edit on GitHub
                </Button>
                <Button
                  color='secondary'
                  fullWidth
                  href={`https://github.com/Pictogrammers/pictogrammers.com/issues/new?title=${encodeURIComponent(`Suggested Change to "${title}"`)}&body=${encodeURIComponent(`*URL:* https://pictogrammers.com/${path}\n\n<!-- Describe how you would improve the documentation here -->`)}`}
                  startIcon={<MDIIcon path={mdiTextBoxPlus} size={1} />}
                  variant='outlined'
                >
                  Suggest a Change
                </Button>
              </div>
            </div>
          </aside>
      </Paper>
    </div>
  );
};

export default PostPage;
