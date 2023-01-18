import { NextPage } from 'next';
import Paper from '@mui/material/Paper';
import Icon from '@mdi/react';
import { mdiCrop, mdiNumeric4 } from '@mdi/js';

import Head from '../components/Head/Head';

import classes from '../styles/pages/404.module.scss';

const ErrorBoundary: NextPage = () => {
  return (
    <div className={classes.root}>
      <Head noIndex title='404 - Page Not Found' />
      <Paper className={classes.container}>
        <div className={classes.badge}>Page Not Found</div>
        <div className={classes.fourohfour}>
          <Icon path={mdiNumeric4} size={10} />
          <Icon path={mdiCrop} size={7} />
          <Icon path={mdiNumeric4} size={10} />
        </div>
        <div>
          <h1>Oh, mdiCrop.</h1>
          <p>We couldn&apos;t find that. Please check the URL and try again.</p>
        </div>
      </Paper>
    </div>
  );
};

export default ErrorBoundary;
