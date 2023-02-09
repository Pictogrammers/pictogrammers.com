import { NextPage } from 'next';
import getConfig from 'next/config';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { siGithub } from 'simple-icons/icons';

import Head from '@/components/Head/Head';

import classes from '@/styles/pages/landing.module.scss';

const AdminLandingPage: NextPage = () => {
  const { publicRuntimeConfig: { apiBase } } = getConfig();

  return (
    <div className={classes.root}>
      <Head noIndex title='Admin' />
      <Paper className={classes.container}>
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <h2>Admin</h2>
          <Button
            href={`${apiBase}/login/github`}
            startIcon={<Icon path={siGithub.path} size={.9} />}
            variant='contained'
          >
            Log in with GitHub
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default AdminLandingPage;
