import { FunctionComponent, useState } from 'react';
import cx from 'clsx';
import Button, { ButtonProps } from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { siFacebook, siGithub, siMastodon } from 'simple-icons';

import MdiHamburger from '@/public/images/hamburger.svg';
import PictogrammersLogo from '@/public/images/pictogrammers-logo.svg';
import PictogrammersWordmark from '@/public/images/brand/logos/pictogrammers-wordmark.svg';

import Link from '@/components/Link/Link';
import SiteSearch from '@/components/SiteSearch/SiteSearch';
import HeaderAuth from '@/components/Header/HeaderAuth';

import classes from './Header.module.scss';

interface NavButtonProps extends ButtonProps {
  href: string;
}

const Header: FunctionComponent = () => {
  const [ menuOpen, setMenu ] = useState(false);

  const NavButton = ({ href, ...props }: NavButtonProps) => (
    <Button
      component={Link}
      href={href}
      onClick={() => setMenu(false)}
      {...props}
    />
  );

  return (
    <header id='top' className={classes.root}>
      <Link
        className={classes.logo}
        href='/'
        onClick={() => setMenu(false)}
      >
        <PictogrammersLogo className={classes.monogram} title='Pictogrammers Monogram' />
        <PictogrammersWordmark className={classes.wordmark} title='Pictogrammers' />
      </Link>
      <div className={cx(classes.main, {
        [classes.open]: menuOpen
      })}>
        <nav className={classes.primary}>
          <div className={classes.menu}>
            <NavButton href='/libraries/'>Icons & Fonts</NavButton>
            <NavButton href='/docs/'>Docs</NavButton>
            <NavButton href='/tools/'>Tools</NavButton>
            <NavButton href='/docs/general/about/'>About</NavButton>
            <NavButton href='/docs/contribute/'>Contribute</NavButton>
          </div>
          <div className={classes.social}>
            <IconButton href='https://github.com/Pictogrammers'>
              <Icon path={siGithub.path} size={1} />
            </IconButton>
            <IconButton href='https://fosstodon.org/@pictogrammers'>
              <Icon path={siMastodon.path} size={1} />
            </IconButton>
            <IconButton href='https://www.facebook.com/pictogrammers'>
              <Icon path={siFacebook.path} size={1} />
            </IconButton>
          </div>
        </nav>
        <div className={classes.secondary}>
          <SiteSearch />
          <HeaderAuth />
        </div>
      </div>
      <button
        aria-label='menu'
        className={cx(classes.hamburger, {
          [classes.open]: menuOpen
        })}
        onClick={() => {
          if (menuOpen) {
            document.body.style.removeProperty('overflow');
            return setMenu(false);
          }
          document.body.style.overflow = 'hidden';
          return setMenu(true);
        }}
      >
        <MdiHamburger
          className={cx({
            [classes.active]: menuOpen
          })}
          title={menuOpen ? 'Close Menu' : 'Open Menu'}
        />
      </button>
    </header>
  );
};

export default Header;
