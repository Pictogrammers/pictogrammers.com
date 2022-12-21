import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Paper from '@mui/material/Paper';

import getConfig from 'next/config';

import classes from '../../styles/pages/landing.module.scss';

interface IconLibraryProps {
  description: string;
  id: string;
  image: string;
  name: string;
  package: string;
}

const IconsLandingPage: NextPage = () => {
  const { publicRuntimeConfig: config } = getConfig();
  const { libraries: { icons } } = config;

  return (
    <div className={classes.root}>
      <Head>
        <title>Icons - Pictogrammers</title>
        <meta content='Icons - Pictogrammers' name='title' key='title' />
      </Head>
      <Paper className={classes.container}>
        <h1>Icon & Font Libraries</h1>
        <p>TODO: Design and build out this page</p>
        <ul>
        {icons.map((library: IconLibraryProps) => (
          <li key={library.id}><Link href={`/icons/${library.id}`}>{library.name}</Link></li>
        ))}
        </ul>
      </Paper>
    </div>
  );
};

export default IconsLandingPage;
