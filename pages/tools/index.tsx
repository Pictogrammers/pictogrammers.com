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
            description='Use the preview generator to generate images of your contribution.'
            href='/tools/github'
            icon={{ color: 'hsl(var(--primary-color))', path: mdiGrid }}
            title='GitHub Preview Generator'
          />
          <LandingPageCard
            chip={{
              color: 'secondary',
              label: 'Coming Soon!'
            }}
            description='Easily convert bitmask images into SVG paths.'
            disabled
            icon={{ color: 'hsl(var(--primary-color))', path: mdiCheckerboard }}
            title='Bitmask to SVG'
          />
        </div>
      </Paper>
    </div>
  );
};

export default ToolsLandingPage;
