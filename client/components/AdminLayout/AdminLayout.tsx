import { FunctionComponent, ReactElement } from 'react';
import cx from 'clsx';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Icon from '@mdi/react';
import { mdiAlertOctagonOutline } from '@mdi/js';

import { useAuth } from '@/providers/AuthProvider';

import classes from './AdminLayout.module.scss';

interface AdminLayoutProps {
  children: ReactElement | ReactElement[];
  title?: string;
}

const loader = (
  <div className={cx(classes.root, classes.loading)}>
    <Paper className={classes.paper}>
      <CircularProgress />
      Verifying permissions. One moment please...
    </Paper>
  </div>
);


const AdminLayout: FunctionComponent<AdminLayoutProps> = ({
  children,
  title = 'Pictogrammers Admin'
}) => {
  const router = useRouter();
  const auth = useAuth();

  if (auth.loading) {
    return loader;
  }

  if (!auth.isLoggedIn) {
    Cookies.set('pg-login-redirect', router.asPath);
    router.push('/login');
    return loader;
  }

  if (!auth?.contributor?.core) {
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <h2>401 - Unauthorized</h2>
          </div>
          <div className={cx(classes.container, classes.unauthorized)}>
            <Icon path={mdiAlertOctagonOutline} size={5} />
            You are unauthorized to access this area.
          </div>
        </Paper>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <h2>{title}</h2>
        </div>
        <div className={classes.container}>
          {children}
        </div>
      </Paper>
    </div>
  );
};

export default AdminLayout;