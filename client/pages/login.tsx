import { NextPage } from 'next';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Icon from '@mdi/react';
import { siGithub } from 'simple-icons';

import { useAuth } from '@/providers/AuthProvider';

import LoginLayout from '@/components/LoginLayout/LoginLayout';
import Link from '@/components/Link/Link';

import classes from '@/styles/pages/login.module.scss';

const Login: NextPage = () => {
  const { publicRuntimeConfig: { apiBase } } = getConfig();
  const auth = useAuth();
  const router = useRouter();

  if (auth?.loading) {
    return (
      <LoginLayout className={classes.loading}>
        <CircularProgress />
        <p>One moment please...</p>
      </LoginLayout>
    );
  };

  if (auth?.isLoggedIn) {
    router.push('/');
    return (
      <LoginLayout className={classes.loading}>
        <CircularProgress />
        <p>You&apos;re logged in.<br/>Taking you to the home page...</p>
      </LoginLayout>
    );
  }

  return (
    <LoginLayout className={classes.container}>
      <h2>Log In or Sign Up</h2>
      {auth?.error && (
        <Alert
          classes={{
            root: classes.alert
          }}
          severity='error'
        >
          <AlertTitle>We were unable to log you in.</AlertTitle>
          {auth.error}
        </Alert>
      )}
      <Button
        fullWidth
        href={`${apiBase}/auth/github`}
        startIcon={<Icon path={siGithub.path} size={.9} />}
        variant='contained'
      >
        Continue with GitHub
      </Button>
      <div className={classes.terms}>
        By continuing, you acknowledge that you read and agree to our <Link href='/docs/contribute/code-of-conduct/'>Code of Conduct</Link> and <Link href='/docs/general/privacy-policy/'>Privacy Policy</Link>.
      </div>
    </LoginLayout>
  );
};

export default Login;
