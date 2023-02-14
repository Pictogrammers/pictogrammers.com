import { FunctionComponent, MouseEvent, useState } from 'react';
import cx from 'clsx';
import Button, { ButtonProps } from '@mui/material/Button';

import MdiHamburger from '@/public/images/hamburger.svg';
import PictogrammersLogo from '@/public/images/pictogrammers-logo.svg';
import PictogrammersWordmark from '@/public/images/brand/logos/pictogrammers-wordmark.svg';

import Link from '@/components/Link/Link';
import SiteSearch from '@/components/SiteSearch/SiteSearch';
// import HeaderAuth from '@/components/Header/HeaderAuth';

import classes from './Header.module.scss';

interface NavButtonProps extends ButtonProps {
  href: string;
}

const Header: FunctionComponent = () => {
  const [ menuOpen, setMenu ] = useState<object | null>(null);

  const NavButton = ({ href, ...props }: NavButtonProps) => (
    <Button
      component={Link}
      href={href}
      onClick={() => setMenu(null)}
      sx={{
        borderRadius: '50px',
        fontSize: '16px',
        padding: '.5rem 1rem',
        textTransform: 'none'
      }}
      {...props}
    />
  );

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    if (menuOpen === null) {
      const buttonPosition = event.currentTarget.getBoundingClientRect();
      const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const viewportPadding = viewportWidth - buttonPosition.right;
      const menuWidth = viewportWidth - (viewportPadding * 2);

      return setMenu({
        left: viewportPadding,
        top: buttonPosition.bottom,
        width: menuWidth
      });
    }

    return setMenu(null);
  };

  return (
    <header id='top' className={classes.root}>
      <nav className={classes.nav}>
        <div className={classes.main}>
          <Link className={classes.logo} href='/'>
            <PictogrammersLogo className={classes.monogram} title='Pictogrammers Monogram' />
            <PictogrammersWordmark className={classes.wordmark} title='Pictogrammers' />
          </Link>
          <div
            className={cx(classes.options, {
              [classes.open]: menuOpen
            })}
            style={{ ...menuOpen }}
          >
            <NavButton href='/libraries'>Icons & Fonts</NavButton>
            <NavButton href='/docs'>Docs</NavButton>
            <NavButton href='/tools'>Tools</NavButton>
            <NavButton className={classes.about} href='/docs/general/about'>About</NavButton>
            <NavButton className={classes.contribute} href='/docs/contribute'>Contribute</NavButton>
          </div>
        </div>
        <div className={classes.secondary}>
          <SiteSearch />
          {/* <HeaderAuth /> */}
          <button
            aria-label='menu'
            className={cx(classes.hamburger, {
              [classes.open]: !!menuOpen
            })}
            onClick={handleMenu}
          >
            <MdiHamburger
              className={cx({
                [classes.active]: menuOpen
              })}
              title={menuOpen ? 'Close Menu' : 'Open Menu'}
            />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
