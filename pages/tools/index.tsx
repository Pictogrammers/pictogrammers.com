import { NextPage } from 'next';
import Head from 'next/head';
import Paper from '@mui/material/Paper';
import { mdiHammerScrewdriver } from '@mdi/js';

import LandingPageHeading from '../../components/LandingPageHeading/LandingPageHeading';

import classes from '../../styles/pages/landing.module.scss';

const ToolsLandingPage: NextPage = () => {
  return (
    <div className={classes.root}>
      <Head>
        <title>Tools - Pictogrammers</title>
        <meta content='Tools - Pictogrammers' name='title' key='title' />
      </Head>
      <Paper className={classes.container}>
        <LandingPageHeading
          title='Tools Landing Page'
          description='TODO: Design and build out this page'
          icon={mdiHammerScrewdriver}
        />
        <ul>
          <li>GitHub Preview Generator</li>
          <li>Bitmask to SVG</li>
        </ul>
      </Paper>
    </div>
  );
};

export default ToolsLandingPage;
