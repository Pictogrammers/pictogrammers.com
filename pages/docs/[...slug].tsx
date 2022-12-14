import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import gfm from 'remark-gfm';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';

import { Icon as MDIIcon } from '@mdi/react';
import { mdiTextBoxPlus } from '@mdi/js';
import { siGithub } from 'simple-icons';

import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { ButtonProps } from '@mui/material/Button';

import { DocData } from '../../interfaces/doc';
import { IconLibraries, IconProps } from '../../interfaces/icons';
import { TableOfContentsItemProps } from '../../interfaces/tableOfContents';
import { getAllDocs, getDoc } from '../../utils/mdxUtils';

import Contributors from '../../components/Docs/Contributors/Contributors';
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

interface IParams extends ParsedUrlQuery {
  slug: string[]
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
  availableIcons: IconLibraries;
  frontMatter: DocData;
  readingTime?: string;
  slug: string;
  source: MDXRemoteSerializeResult;
  toc: Array<TableOfContentsItemProps>;
}

const PostPage: NextPage<Props> = ({ availableIcons, frontMatter, readingTime, slug, source, toc }: Props) => {
  const path = `docs/${slug}`;
  const {
    category,
    description,
    hidden,
    library,
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
                Button: (props: ButtonProps) => Button({...props, availableIcons }),
                code: Code,
                Contributors,
                h1: Heading(1),
                h2: Heading(2),
                h3: Heading(3),
                h4: Heading(4),
                h5: Heading(5),
                h6: Heading(6),
                Icon: (props: IconProps) => Icon({...props, availableIcons }),
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
                startIcon={<MDIIcon path={siGithub.path} size={.9} />}
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
