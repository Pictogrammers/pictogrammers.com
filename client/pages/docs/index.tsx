import { GetStaticProps, NextPage } from 'next';
import ExportedImage from 'next-image-export-optimizer';
import Paper from '@mui/material/Paper';
import { mdiBookOpenPageVariantOutline } from '@mdi/js';

import Head from '@/components/Head/Head';
import LandingPageHeading from '@/components/LandingPageHeading/LandingPageHeading';
import LandingPageCard from '@/components/LandingPageCard/LandingPageCard';

import { getCategoriesAndLibraries } from '@/utils/docUtils';

import classes from '@/styles/pages/landing.module.scss';

export const getStaticProps: GetStaticProps = async () => {
  const docs = await getCategoriesAndLibraries();
  return {
    props: { docs }
  };
};

const renderLibrariesAndCategories = (docs: any) => {
  return Object.keys(docs).map((library) => {
    const libraryInfo = docs[library];
    return (
      <section className={classes.cardGroup} key={library}>
        <h2 id={libraryInfo.id}>{libraryInfo?.name ? libraryInfo.name : 'General'} Docs</h2>
        <div className={classes.cards}>
          {Object.keys(docs[library].categories)
            .map((category) => {
              const categoryInfo = docs[library].categories[category];
              return (
                <LandingPageCard
                  color={`--${categoryInfo.id}-color`}
                  badge={libraryInfo?.image && <ExportedImage alt={libraryInfo.name} placeholder='empty' src={`/${libraryInfo.image}`} width={24} height={24} />}
                  description={categoryInfo.description}
                  headerElement='h3'
                  href={`/docs/${library !== 'all' ? `library/${library}/` : ''}${categoryInfo.id}`}
                  icon={categoryInfo.icon}
                  key={categoryInfo.id}
                  superTitle={libraryInfo.name}
                  title={categoryInfo.name}
                />
              );
            })}
        </div>
      </section>
    );
  });
};

const DocsLandingPage: NextPage<any> = ({ docs }) => {
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
        {renderLibrariesAndCategories(docs)}
      </Paper>
    </div>
  );
};

export default DocsLandingPage;
