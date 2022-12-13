import { FunctionComponent, useState } from 'react';
import cx from 'clsx';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { siGithub } from 'simple-icons';

import MdiHamburger from '../../assets/hamburger.svg';
import PictogrammersLogo from '../../assets/pictogrammers-logo.svg';

import classes from './Header.module.scss';

const NavButton = styled(Button)({
  borderRadius: 50,
  fontSize: 16,
  padding: '.5rem 1rem',
  textTransform: 'none'
});

const Header: FunctionComponent = () => {
  const [ menuOpen, setMenuOpen ] = useState<boolean>(false);

  return (
    <header id='top' className={classes.root}>
      <nav className={classes.nav}>
        <div className={classes.main}>
          <Link className={classes.logo} href='/'>
            <PictogrammersLogo title='Pictogrammers' />
          </Link>
          <div className={cx(classes.options, {
            [classes.open]: menuOpen
          })}>
            <NavButton>
              Icons
            </NavButton>
            <NavButton href='/docs/'>
              Docs
            </NavButton>
            <NavButton href='/docs/about'>
              About
            </NavButton>
            <NavButton
              href='/#join'
              onClick={() => setMenuOpen(false)}
            >
              Join Us
            </NavButton>
          </div>
        </div>
        <button
          aria-label='menu'
          className={cx(classes.hamburger, {
            [classes.open]: menuOpen
          })}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MdiHamburger
            className={cx({
              [classes.active]: menuOpen
            })}
            title={menuOpen ? 'Close Menu' : 'Open Menu'}
          />
        </button>
      </nav>
      <div className={classes.github}>
        <NavButton
          href='https://github.com/Pictogrammers'
          startIcon={<Icon path={siGithub.path} size={.9} />}
          variant='contained'
        >
          GitHub
        </NavButton>
      </div>
    </header>
  );
};

export default Header;
