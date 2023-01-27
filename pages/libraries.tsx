import { NextPage } from 'next';
import getConfig from 'next/config';
import ExportedImage from 'next-image-export-optimizer';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { mdiFormatFont, mdiRobotExcited } from '@mdi/js';

import Head from '../components/Head/Head';
import LandingPageHeading from '../components/LandingPageHeading/LandingPageHeading';
import LandingPageCard from '../components/LandingPageCard/LandingPageCard';

import iconLibraries from '../public/data/libraries.json';

import pictoLibraries from '../public/images/libraries/picto-libraries.png';

import classes from '../styles/pages/landing.module.scss';

interface LibraryProps {
  color?: string;
  description?: string;
  id: string;
  image?: string;
  name: string;
  unreleased?: boolean;
}

const LibraryCard = (props: { library: LibraryProps, type: string }) => {
  const { library, type } = props;
  const libraryStats = iconLibraries?.[library.id as keyof typeof iconLibraries] || {};

  return (
    <LandingPageCard
      chip={{
        color: library.unreleased ? 'primary' : 'secondary',
        label: library.unreleased ? 'Coming Soon!' : `${libraryStats.count} Icons`
      }}
      color={`--${library.id}-color`}
      description={library.unreleased ? 'Unreleased' : `v${libraryStats.version} | Released on ${dayjs(libraryStats.date).format('MMM DD, YYYY')}`}
      disabled={!!library.unreleased}
      headerElement='h3'
      href={library.unreleased ? undefined : `/library/${library.id}`}
      icon={!library.image ? type === 'font' ? mdiFormatFont : mdiRobotExcited : undefined}
      graphicElement={library.image ? <ExportedImage alt={`${library.name} Image`} height={64} placeholder='empty' src={`/${library.image}`} width={64} /> : undefined}
      title={library.name}
    />
  );
};

const IconsLandingPage: NextPage = () => {
  const { publicRuntimeConfig: config } = getConfig();
  const { libraries: { fonts, icons } } = config;

  return (
    <div className={classes.root}>
      <Head
        description='Our libraries are beautifully crafted and completely open-source, so you can focus on your designs and development.'
        title='Icon & Font Libraries'
      />
      <Paper className={classes.container}>
        <LandingPageHeading
          title='Icons & Fonts'
          description='Our libraries are beautifully crafted and completely open-source, so you can focus on your designs and development.'
          graphicElement={<ExportedImage alt='Pictogrammers Libraries' height={275} placeholder='empty' priority src={pictoLibraries} width={275} />}
          showClouds={false}
        />
        <section className={classes.cardGroup}>
          <h2>Icon Libraries</h2>
          <div className={classes.cards}>
            {icons.map((library: LibraryProps) => <LibraryCard key={library.id} library={library} type='icon' />)}
          </div>
        </section>
        <section className={classes.cardGroup}>
          <h2>Font Libraries</h2>
          <div className={classes.cards}>
            {fonts.map((library: LibraryProps) => <LibraryCard key={library.id} library={library} type='font' />)}
          </div>
        </section>
      </Paper>
    </div>
  );
};

export default IconsLandingPage;
