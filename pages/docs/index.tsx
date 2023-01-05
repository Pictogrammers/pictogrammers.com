import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Paper from '@mui/material/Paper';
import { mdiBookOpenPageVariantOutline } from '@mdi/js';

import LandingPageHeading from '../../components/LandingPageHeading/LandingPageHeading';

import { getAllDocs } from '../../utils/mdxUtils';

import classes from '../../styles/pages/landing.module.scss';

interface DocumentIndex {
  [key: string]: {
    [key: string]: [
      {
        description?: string;
        hidden?: boolean;
        slug: string;
        title: string;
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

const DocsLandingPage: NextPage<DocsLandingPageProps> = ({ docs }) => {
  console.log(docs);

  return (
    <div className={classes.root}>
      <Head>
        <title>Documentation - Pictogrammers</title>
        <meta content='Documentation - Pictogrammers' name='title' key='title' />
      </Head>
      <Paper className={classes.landing}>
        <LandingPageHeading
          title='Welcome to the Pictogrammers Docs'
          description='Learn how to get started with our icon and font libraries in your projects.'
          icon={mdiBookOpenPageVariantOutline}
        />

        <p>TODO: Show stylized cards for each category: Getting Started, Contributing, Library-specific Guides, etc dynamicly from generated MDX files</p>
        {Object.keys(docs).map((library, i) => {
          return (
            <div key={i}>
              <h2>Library: {library}</h2>
              {Object.keys(docs[library]).map((category, c) => {
                return (
                  <div key={`c-${c}`}>
                    <h3>Category: {category}</h3>
                    <ul>
                    {docs[library][category].map((doc) => {
                      return (
                        <li key={doc.slug}><Link href={`/docs/${doc.slug}`}>{doc.title}</Link></li>
                      );
                    })}
                    </ul>
                  </div>
                );
              })}
            </div>
          );
        })}
      </Paper>
    </div>
  );
};

export default DocsLandingPage;
