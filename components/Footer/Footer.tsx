import { FunctionComponent } from 'react';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { siGithub, siMastodon } from 'simple-icons/icons';

import PictogrammersLogo from '../../assets/pictogrammers-logo.svg';

import classes from './Footer.module.scss';

const Footer: FunctionComponent = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={classes.root}>
      <ul>
        <li className={classes.copyright}>
          <Link aria-label='Return to the Pictogrammers Home' className={classes.logo} href='#top'>
            <PictogrammersLogo />
          </Link>
          © {year} Pictogrammers Icon Group.
        </li>
        <li>
          <Link href='/docs/about/code-of-conduct/'>Code of Conduct</Link>
        </li>
        <li>
          <Link href='/brand-guidelines/'>Logo & Assets</Link>
        </li>
        <li className={classes.connect}>
          <span className={classes.connectText}>Connect with us:</span>
          <div>
            <IconButton>
              <Link aria-label='Pictogrammers on GitHub' href='https://github.com/Pictogrammers'>
                <Icon path={siGithub.path} size={1.25} />
              </Link>
            </IconButton>
            <IconButton>
              <Link aria-label='Follow Pictogrammers on Mastodon' href='https://github.com/Pictogrammers' rel='me'>
                <Icon path={siMastodon.path} size={1.25} />
              </Link>
            </IconButton>
          </div>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
