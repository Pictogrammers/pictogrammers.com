import { Fragment, FunctionComponent, MouseEvent, useState } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import ExportedImage from 'next-image-export-optimizer';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { mdiAccountBoxOutline, mdiLoginVariant, mdiLogoutVariant, mdiShieldAccountOutline } from '@mdi/js';

import { useAuth } from '@/providers/AuthProvider';
import { useData } from '@/providers/DataProvider';

import { ContributorProps } from '@/interfaces/contributor';

import Link from '@/components/Link/Link';

import classes from './Header.module.scss';

const HeaderAuth: FunctionComponent = () => {
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
  const { publicRuntimeConfig: { apiBase } } = getConfig();
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuth();
  const { contributors } = useData();
  const router = useRouter();

  const thisContributor = contributors.find((contributor: ContributorProps) => contributor.github === auth?.contributor?.github);
  const thisContributorColor = thisContributor ? thisContributor?.core ? '--primary-color' : '--dark-cyan' : '--dark-grey';

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogin = () => {
    // Store the current path so we can return the user to it after login
    if (router.asPath !== '/login/') {
      Cookies.set('pg-login-redirect', router.asPath);
    }
  };

  return (
    <div className={classes.auth}>
      {auth.isLoggedIn ? (
        <Fragment>
          <IconButton
            aria-label={auth?.contributor?.name || auth.github.name}
            onClick={handleMenuOpen}
          >
            <Avatar
              sx={{
                backgroundColor: `hsl(var(${thisContributorColor}))`,
                border: `2px solid hsl(var(${thisContributorColor}))`
              }}
            >
              {thisContributor?.image ? (
                <ExportedImage
                  alt={thisContributor?.name || auth.github.name}
                  height={42}
                  placeholder='empty'
                  src={thisContributor?.image ? `/images/contributors/${thisContributor?.id}.jpg` : auth.github.avatar}
                  width={42}
                />
              ) : (thisContributor?.name || auth.github.name).split(' ').map((n: string) => n[0]).join('').toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            open={!!anchorEl}
          >
            <MenuList dense sx={{ padding: 0 }}>
              {auth?.contributor && [
                <MenuItem
                  component={Link}
                  href={`/contributor/${auth.contributor.github}`}
                  key={auth.contributor.github}
                  onClick={handleMenuClose}
                >
                  <ListItemIcon>
                    <Icon path={mdiAccountBoxOutline} size={1} />
                  </ListItemIcon>
                  My Contributor Profile
                </MenuItem>,
                <Divider key='profile-div' />
              ]}
              {auth?.contributor?.core && [
                <MenuItem
                  component={Link}
                  href='/admin'
                  key='admin'
                  onClick={handleMenuClose}
                >
                  <ListItemIcon>
                    <Icon path={mdiShieldAccountOutline} size={1} />
                  </ListItemIcon>
                  Administration Portal
                </MenuItem>,
                <Divider key='admin-div' />
              ]}
              <MenuItem
                component='a'
                onClick={(event: MouseEvent) => {
                  handleMenuClose();
                  auth.logout(event);
                  enqueueSnackbar('You have been logged out.', { variant: 'success' });
                }}
                href={`${apiBase}/auth/logout`}
              >
                <ListItemIcon>
                  <Icon path={mdiLogoutVariant} size={1} />
                </ListItemIcon>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        </Fragment>
      ) : (
        <Tooltip title='Log In'>
          <IconButton
            aria-label='Log In'
            component={Link}
            href='/login'
            onClick={handleLogin}
            sx={{
              height: 56,
              width: 56
            }}
          >
            <Icon path={mdiLoginVariant} color='hsl(var(--primary-color))' size={1} />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default HeaderAuth;