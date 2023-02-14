import { NextPage } from 'next';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import cx from 'clsx';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Icon from '@mdi/react';
import { mdiHumanGreetingVariant } from '@mdi/js';
import { siGithub } from 'simple-icons/icons';

import { useAuth } from '@/providers/AuthProvider';

import Head from '@/components/Head/Head';

import classes from '@/styles/pages/login.module.scss';

const Login: NextPage = () => {
  const { publicRuntimeConfig: { apiBase } } = getConfig();
  const auth = useAuth();
  const router = useRouter();

  if (auth?.loading) {
    return (
      <div className={cx(classes.root, classes.loading)}>
        <Paper className={classes.container}>
          <CircularProgress />
          One moment please...
        </Paper>
      </div>
    );
  };

  if (auth?.isLoggedIn) {
    router.push('/');
    return (
      <div className={cx(classes.root, classes.loading)}>
        <Paper className={classes.container}>
          <CircularProgress />
          You&apos;re already logged in. Taking you to the home page...
        </Paper>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Head noIndex title='Log In' />
      <Paper className={classes.container}>
        <div className={classes.loginContainer}>
          <h2>Welcome back</h2>
          <Icon path={mdiHumanGreetingVariant} size={5} />
          <p>Log in with your GitHub account to get started.</p>
          {auth?.error && (
            <Alert severity='error' sx={{ marginBottom: '2rem' }}>
              <AlertTitle>We were unable to log you in.</AlertTitle>
              {auth.error}
              Something happened blah blah blah.
            </Alert>
          )}
          <Button
            href={`${apiBase}/auth/github`}
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

export default Login;
