import { GetStaticProps, NextPage } from 'next';
import getConfig from 'next/config';
import Paper from '@mui/material/Paper';
import { mdiBookOpenPageVariantOutline } from '@mdi/js';

import Head from '../../components/Head/Head';
import LandingPageHeading from '../../components/LandingPageHeading/LandingPageHeading';
import LandingPageCard from '../../components/LandingPageCard/LandingPageCard';

import { getAllDocs } from '../../utils/docUtils';

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
      category,
      hidden,
      library,
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
  const { publicRuntimeConfig: { docs: { categories }, libraries } } = getConfig();

  return (
    <div className={classes.root}>
      <Head
        description='Learn how to get started with our icon and font libraries in your projects.'
        title='Documentation'
      />
      <Paper className={classes.container}>
        <LandingPageHeading
          title='Welcome to the Pictogrammers Docs'
          description='Learn how to get started with our icon and font libraries in your projects.'
          icon={mdiBookOpenPageVariantOutline}
        />
        {Object.keys(docs).map((library, i) => {
          const libraryInfo = libraries.icons.find((i: any) => i.id === library);
          return (
            <section className={classes.cardGroup} key={i}>
              {libraryInfo && <h2 id={libraryInfo.id}>{libraryInfo.name} Docs</h2>}
              <div className={classes.cards}>
                {Object.keys(docs[library])
                  .sort((a, b) => {
                    const aIndex = categories.findIndex((c: any) => c.id === a);
                    const bIndex = categories.findIndex((c: any) => c.id === b);
                    return aIndex < bIndex ? -1 : aIndex > bIndex ? 1 : 0;
                  })
                  .map((category) => {
                    const categoryInfo = categories.find((c: any) => c.id === category);
                    return (
                      <LandingPageCard
                        color={`--${categoryInfo.id}-color`}
                        description={categoryInfo.description}
                        href={`/docs/${libraryInfo ? `${library}/` : ''}${categoryInfo.id}`}
                        icon={categoryInfo.icon}
                        key={categoryInfo.id}
                        title={categoryInfo.name}
                      />
                    );
                  })}
              </div>
            </section>
          );
        })}
      </Paper>
    </div>
  );
};

export default DocsLandingPage;
