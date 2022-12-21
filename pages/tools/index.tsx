import { NextPage } from 'next';
import Head from 'next/head';
import Paper from '@mui/material/Paper';

import classes from '../../styles/pages/landing.module.scss';

const ToolsLandingPage: NextPage = () => {
  return (
    <div className={classes.root}>
      <Head>
        <title>Tools - Pictogrammers</title>
        <meta content='Tools - Pictogrammers' name='title' key='title' />
      </Head>
      <Paper className={classes.container}>
        <h1>Tools Landing Page</h1>
        <p>TODO: Design and build out this page</p>
        <ul>
          <li>GitHub Preview Generator</li>
          <li>Bitmask to SVG</li>
        </ul>
      </Paper>
    </div>
  );
};

export default ToolsLandingPage;
