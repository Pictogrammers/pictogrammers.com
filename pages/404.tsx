import { Fragment, FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import Paper from '@mui/material/Paper';
import Icon from '@mdi/react';
import { mdiEmoticonConfusedOutline } from '@mdi/js';

import classes from '../styles/pages/404.module.scss';

const ErrorBoundary: FunctionComponent = () => {
  return (
    <Fragment>
      <Helmet>
        <title>404 - Page Not Found - Pictogrammers</title>
        <meta content='404 - Page Not Found - Pictogrammers' name='title' />
        <meta name='robots' content='noindex' />
      </Helmet>
      <div className={classes.root}>
        <Paper className={classes.container}>
          <Icon path={mdiEmoticonConfusedOutline} size={10} />
          <div>
            <p>- 404 -</p>
            <h1>We couldn&apos;t find that.</h1>
            <p>Please check the URL and try again.</p>
          </div>
        </Paper>
      </div>
    </Fragment>
  );
};

export default ErrorBoundary;
