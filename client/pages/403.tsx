import { NextPage } from 'next';
import Paper from '@mui/material/Paper';
import Icon from '@mdi/react';
import { mdiShieldAlertOutline } from '@mdi/js';

import Head from '@/components/Head/Head';

import classes from '@/styles/pages/error-page.module.scss';

const ForbiddenPage: NextPage = () => {
  return (
    <div className={classes.root}>
      <Head noIndex title='403 - Forbidden' />
      <Paper className={classes.container}>
        <div className={classes.badge}>Forbidden</div>
        <Icon className={classes.icon} path={mdiShieldAlertOutline} size={10} />
        <p>You do not have permission to access this resource.</p>
      </Paper>
    </div>
  );
};

export default ForbiddenPage;
