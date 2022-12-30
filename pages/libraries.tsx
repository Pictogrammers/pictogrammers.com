import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import getConfig from 'next/config';
import cx from 'clsx';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';

import iconLibraries from '../public/libraries/libraries.json';

import pictoLibraries from '../assets/libraries/picto-libraries.png';

import classes from '../styles/pages/libraries.module.scss';

interface IconLibraryProps {
  description: string;
  id: string;
  image: string;
  name: string;
  package: string;
  unreleased?: boolean;
}

const IconsLandingPage: NextPage = () => {
  const { publicRuntimeConfig: config } = getConfig();
  const { libraries: { icons } } = config;

  return (
    <div className={classes.root}>
      <Head>
        <title>Icon & Font Libraries - Pictogrammers</title>
        <meta content='Icons & Font Libraries - Pictogrammers' name='title' key='title' />
      </Head>
      <Paper className={classes.container}>
        <div className={classes.heading}>
          <div className={classes.title}>
            <h1>Icons & Fonts</h1>
            <p>Our libraries are beautifully crafted and completely open-source, so you can focus on your designs and development.</p>
          </div>
          <Image alt='Pictogrammers Libraries' height={275} src={pictoLibraries} width={275} />
        </div>
  
        <div className={classes.typeHeading}>
          Icon Libraries
        </div>
        <div className={classes.libraries}>
          {icons.map((library: IconLibraryProps) => {
            if (library.unreleased) {
              return (
                <div className={cx(classes.libraryCard, classes.unreleased)} key={library.id}>
                  <div className={classes.images}>
                    <Image alt={`${library.name} Logo`} height={64} src={`/${library.image}`} width={64} />
                    <Chip label='Coming Soon!' color='primary' />
                  </div>
                  <div>
                    <h2>{library.name}</h2>
                    <p className={classes.subtext}>Unreleased</p>
                  </div>
                </div>
              );
            }

            const libraryStats = iconLibraries[library.id as keyof typeof iconLibraries];
            return (
              <Link className={classes.libraryCard} href={`/library/${library.id}`} key={library.id}>
                <div className={classes.images}>
                  <Image alt={`${library.name} Logo`} height={64} src={`/${library.image}`} width={64} />
                  <Chip label={`${libraryStats.count} Icons`} color='secondary' />
                </div>
                <div>
                  <h2>{library.name}</h2>
                  <p className={classes.subtext}>v{libraryStats.version} | Released on {dayjs(libraryStats.date).format('MMM DD, YYYY')}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={classes.typeHeading}>
          Font Libraries
        </div>
        <div className={classes.libraries}>
          WIP
        </div>
      </Paper>
    </div>
  );
};

export default IconsLandingPage;
