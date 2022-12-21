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
        <h1>Welcome to the Pictogrammers Docs</h1>
        <p>Learn how to get started with our icon and font libraries in your project.</p>
        <p>TODO: Design and style this page</p>
        <p>TODO: Show stylized cards for each category: Getting Started, Contributing, Library-specific Guides, etc dynamicly from generated MDX files</p>
      </Paper>
    </div>
  );
};

export default DocsLandingPage;
