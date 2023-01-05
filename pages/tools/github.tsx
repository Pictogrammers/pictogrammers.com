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
        Use the GitHub tool below to generate preview images. Note you must combine all vector items into a single vector.

- SVG should be 24x24
- Select all vector objects
- Then unite or combine the paths
- Export as an SVG
- Upload the file below.
- Or open the `.svg` in a text editor.
  - Find the `&lt;path d=&quot;&quot;&gt;` in the `.svg`
  - Copy the `d` attribute&apos;s contents into the path data field below
      </Paper>
    </div>
  );
};

export default ToolsGitHub;
