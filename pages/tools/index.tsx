import { NextPage } from 'next';
import Paper from '@mui/material/Paper';
import { mdiHammerScrewdriver } from '@mdi/js';
import { mdiCheckerboard, mdiGrid } from '@mdi/js';

import Head from '../../components/Head/Head';
import LandingPageHeading from '../../components/LandingPageHeading/LandingPageHeading';
import LandingPageCard from '../../components/LandingPageCard/LandingPageCard';

import classes from '../../styles/pages/landing.module.scss';

const ToolsLandingPage: NextPage = () => {
  return (
    <div className={classes.root}>
      <Head
        description='If you are looking to contribute to a Pictogrammers project, many of these tools may be of assistance.'
        title='Tools'
      />
      <Paper className={classes.container}>
        <LandingPageHeading
          title='Pictogrammers Tools'
          description='If you are looking to contribute to a Pictogrammers project, many of these tools may be of assistance.'
          icon={mdiHammerScrewdriver}
        />

        <div className={classes.cards}>
          <LandingPageCard
            color='--primary-color'
            description='Use the preview generator to generate images of your contribution.'
            href='/tools/github'
            icon={mdiGrid}
            title='GitHub Preview Generator'
          />
          <LandingPageCard
            color='--primary-color'
            description='Created pixel-based icons in your browser.'
            href='/tools/pixel-editor'
            icon={mdiCheckerboard}
            title='Pixel Editor'
          />
        </div>
      </Paper>
    </div>
  );
};

export default ToolsLandingPage;
