import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Paper from '@mui/material/Paper';

import { getAllDocs } from '../../utils/mdxUtils';

import classes from '../../styles/pages/landing.module.scss';

interface DocumentIndex {
  [key: string]: {
    [key: string]: [
      {
        title: string,
        description?: string,
        hidden?: boolean
      }
    ]
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const docs = getAllDocs(['title', 'description', 'category', 'library', 'hidden', 'slug']);
  const groupedDocs = docs.reduce((output, doc) => {
    const {
      category = 'General',
      hidden,
      library = 'General',
      ...rest
    } = doc;

    if (hidden) {
      return output;
    }

    if (!output[library]) {
      output[library] = {};
    }

    if (!output[library][category]) {
      output[library][category] = [];
    }

    output[library][category].push({ ...rest });
    return output;
  }, {} as DocumentIndex);

  return {
    props: {
      docs: groupedDocs
    }
  };
};

interface DocsLandingPageProps {
  docs: DocumentIndex
};

const DocsLandingPage: NextPage<DocsLandingPageProps> = ({ docs }: DocsLandingPageProps) => {
  console.log(docs);

  return (
    <div className={classes.root}>
      <Head>
        <title>Documentation - Pictogrammers</title>
        <meta content='Documentation - Pictogrammers' name='title' key='title' />
      </Head>
      <Paper className={classes.container}>
        <h1>Welcome to the Pictogrammers Docs</h1>
        <p>Learn how to get started with our icon and font libraries in your project.</p>
        <p>TODO: Design and style this page</p>
        <p>TODO: Show stylized cards for each category: Getting Started, Contributing, Library-specific Guides, etc dynamicly from generated MDX files</p>
        <p>Examples:</p>
        <ul>
          <li><Link href='/docs/mdi/getting-started'>MDI Getting Started</Link></li>
          <li><Link href='/docs/mdi/guides/home-assistant'>MDI Home Assistant Guide</Link></li>
        </ul>
      </Paper>
    </div>
  );
};

export default DocsLandingPage;
