import { FunctionComponent, ReactNode } from 'react';
import cx from 'clsx';
import Paper from '@mui/material/Paper';

import Head from '@/components/Head/Head';
import Link from '@/components/Link/Link';

import PictogrammersLogo from '@/public/images/pictogrammers.svg';

import classes from './LoginLayout.module.scss';

interface LoginLayoutProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

const LoginLayout: FunctionComponent<LoginLayoutProps> = ({ children, className }) => {
  return (
    <div className={classes.root}>
      <Head noIndex title='Log In' />
      <Link className={classes.logo} href='/'>
        <PictogrammersLogo />
      </Link>
      <Paper className={cx(classes.container, className)} elevation={3}>{children}</Paper>
    </div>
  );
};

export default LoginLayout;
