import { FunctionComponent } from 'react';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { mdiGithub, mdiMastodon } from '@mdi/js';

import PictogrammersLogo from '../../assets/pictogrammers-logo.svg';

import classes from './Footer.module.scss';

const Footer: FunctionComponent = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={classes.root}>
      <ul>
        <li className={classes.copyright}>
          <a className={classes.logo} href='#top'>
            <PictogrammersLogo />
          </a>
          © {year} Pictogrammers Icon Group.
        </li>
        <li>
          <Link href='/docs/about/code-of-conduct/'>Code of Conduct</Link>
        </li>
        <li>
          <Link href='/docs/about/brand-guidelines/'>Logo & Assets</Link>
        </li>
        <li className={classes.connect}>
          <span className={classes.connectText}>Connect with us:</span>
          <div>
            <IconButton aria-label='Pictogrammers on GitHub'>
              <Link href='https://github.com/Pictogrammers'>
                <Icon path={mdiGithub} size={1.5} />
              </Link>
            </IconButton>
            <IconButton aria-label='Follow Pictogrammers on Mastodon'>
              <Link href='https://github.com/Pictogrammers' rel='me'>
                <Icon path={mdiMastodon} size={1.5} />
              </Link>
            </IconButton>
          </div>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
