import { NextPage } from 'next';
import Head from 'next/head';
import Paper from '@mui/material/Paper';

import classes from '../../styles/pages/landing.module.scss';

const DocsLandingPage: NextPage = () => {
  return (
    <div className={classes.root}>
      <Head>
        <title>Documentation - Pictogrammers</title>
        <meta content='Documentation - Pictogrammers' name='title' key='title' />
      </Head>
      <Paper className={classes.container}>
        <p>Documentation Landing Page</p>
      </Paper>
    </div>
  );
};

export default DocsLandingPage;
