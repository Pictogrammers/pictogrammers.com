import { NextPage } from 'next';
import Head from 'next/head';
import Paper from '@mui/material/Paper';

import classes from '../../styles/pages/landing.module.scss';

const ToolsGitHub: NextPage = () => {
  return (
    <div className={classes.root}>
      <Head>
        <title>GitHub Tools - Pictogrammers</title>
        <meta content='GitHub Tools - Pictogrammers' name='title' key='title' />
      </Head>
      <Paper className={classes.container}>
        <p>GitHub Tools Landing Page</p>
      </Paper>
    </div>
  );
};

export default ToolsGitHub;
