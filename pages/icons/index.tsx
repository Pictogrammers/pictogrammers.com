import { NextPage } from 'next';
import Head from 'next/head';
import Paper from '@mui/material/Paper';

import classes from '../../styles/pages/landing.module.scss';

const IconsLandingPage: NextPage = () => {
  return (
    <div className={classes.root}>
      <Head>
        <title>Icons - Pictogrammers</title>
        <meta content='Icons - Pictogrammers' name='title' key='title' />
      </Head>
      <Paper className={classes.container}>
        <p>Icons Landing Page</p>
      </Paper>
    </div>
  );
};

export default IconsLandingPage;
