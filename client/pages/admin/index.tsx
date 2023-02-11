import { NextPage } from 'next';
import getConfig from 'next/config';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Icon from '@mdi/react';
import { siGithub } from 'simple-icons/icons';

import { useAdminData } from '@/providers/AdminProvider';

import Link from '@/components/Link/Link';
import Head from '@/components/Head/Head';

import classes from '@/styles/pages/admin.module.scss';

const AdminLandingPage: NextPage = () => {
  const { publicRuntimeConfig: { apiBase } } = getConfig();
  const adminData = useAdminData();

  return (
    <div className={classes.loginContainer}>
      <Head noIndex title='Login - Admin' />
      {adminData?.error === 'contributorNotFound' && (
        <Alert severity='error' sx={{ marginBottom: '2rem' }}>
          <AlertTitle>You&apos;re not a contributor.</AlertTitle>
          Only contributors can log into the admin section. Want to become a contributor? <Link href='/docs/contribute'>See what you can do to help!</Link>
        </Alert>
      )}
      {adminData?.auth && (
        <p>You are logged in.</p>
      )}
      {!adminData?.auth && (
        <Button
          href={`${apiBase}/auth/github`}
          startIcon={<Icon path={siGithub.path} size={.9} />}
          variant='contained'
        >
          Log in with GitHub
        </Button>
      )}
    </div>
  );
};

export default AdminLandingPage;
