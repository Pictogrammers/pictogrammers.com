import { NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { mdiFormatFont, mdiRobotExcited } from '@mdi/js';

import LandingPageHeading from '../components/LandingPageHeading/LandingPageHeading';
import LandingPageCard from '../components/LandingPageCard/LandingPageCard';

import iconLibraries from '../public/libraries/libraries.json';

import pictoLibraries from '../assets/libraries/picto-libraries.png';

import classes from '../styles/pages/landing.module.scss';

interface IconLibraryProps {
  description?: string;
  id: string;
  image?: string;
  name: string;
  unreleased?: boolean;
}

const LibraryCard = (props: { library: IconLibraryProps, type: string }) => {
  const { library, type } = props;
  const libraryStats = iconLibraries?.[library.id as keyof typeof iconLibraries] || {};

  return (
    <LandingPageCard
      chip={{
        color: library.unreleased ? 'primary' : 'secondary',
        label: library.unreleased ? 'Coming Soon!' : `${libraryStats.count} Icons`
      }}
      description={library.unreleased ? 'Unreleased' : `v${libraryStats.version} | Released on ${dayjs(libraryStats.date).format('MMM DD, YYYY')}`}
      disabled={!!library.unreleased}
      href={library.unreleased ? undefined : `/library/${library.id}`}
      icon={!library.image ? {
        path: type === 'font' ? mdiFormatFont : mdiRobotExcited
      } : undefined}
      image={library.image}
      title={library.name}
    />
  );
};

const IconsLandingPage: NextPage = () => {
  const { publicRuntimeConfig: config } = getConfig();
  const { libraries: { icons } } = config;

  const pageTitle = 'Icon & Font Libraries - Pictogrammers';
  const pageDesc = 'Our libraries are beautifully crafted and completely open-source, so you can focus on your designs and development.';

  return (
    <div className={classes.root}>
      <Head>
        <title>{pageTitle}</title>
        <meta content={pageTitle} name='title' key='title' />
        <meta content={pageDesc} name='description' key='description' />

        <meta content={pageTitle} property='og:title' key='og:title' />
        <meta content={pageDesc} property='og:description' key='og:description' />
        <meta content='https://pictogrammers.com/libraries' property='og:url' key='og:url' />

        <meta content={pageTitle} name='twitter:title' key='twitter:title' />
        <meta content={pageDesc} name='twitter:description' key='twitter:description' />
      </Head>
      <Paper className={classes.container}>
        <LandingPageHeading
          title='Icons & Fonts'
          description='Our libraries are beautifully crafted and completely open-source, so you can focus on your designs and development.'
          image={{
            alt: 'Pictogrammers Libraries',
            height: 275,
            src: pictoLibraries,
            width: 275
          }}
        />
  
        <div className={classes.typeHeading}>
          Icon Libraries
        </div>
        <div className={classes.cards}>
          {icons.map((library: IconLibraryProps) => <LibraryCard key={library.id} library={library} type='icon' />)}
        </div>

        <div className={classes.typeHeading}>
          Font Libraries
        </div>
        <div className={classes.cards}>
          <LibraryCard
            library={{
              id: 'jun',
              name: 'Jun Mono',
              unreleased: true
            }}
            type='font'
          />
        </div>
      </Paper>
    </div>
  );
};

export default IconsLandingPage;
