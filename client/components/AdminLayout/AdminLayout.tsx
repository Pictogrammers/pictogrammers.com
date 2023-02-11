import { FunctionComponent, ReactElement } from 'react';
import getConfig from 'next/config';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { mdiExitToApp } from '@mdi/js';

import { useAdminData } from '@/providers/AdminProvider';

import classes from './AdminLayout.module.scss';

interface AdminLayoutProps {
  children: ReactElement[];
  title?: string;
}

// TODO: Logout button should handle call async and destroy client session

const AdminLayout: FunctionComponent<AdminLayoutProps> = ({
  children,
  title = 'Pictogrammers Admin'
}) => {
  const { publicRuntimeConfig: { apiBase } } = getConfig();
  const adminData = useAdminData();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <h2>{title}</h2>
          {adminData?.auth && (
            <Button
              href={`${apiBase}/auth/logout`}
              startIcon={<Icon path={mdiExitToApp} size={1} />}
              variant='contained'
            >
              Log Out
            </Button>
          )}
        </div>
        <div className={classes.container}>
          {children}
        </div>
      </Paper>
    </div>
  );
};

export default AdminLayout;