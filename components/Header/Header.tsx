import { FunctionComponent, useState } from 'react';
import cx from 'clsx';
import Link from 'next/link';
import Button, { ButtonProps } from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { siGithub } from 'simple-icons/icons';

import MdiHamburger from '../../assets/hamburger.svg';
import PictogrammersLogo from '../../assets/pictogrammers-logo.svg';
import PictogrammersWordmark from '../../assets/brand/logos/pictogrammers-wordmark.svg';

import SiteSearch from '../SiteSearch/SiteSearch';

import classes from './Header.module.scss';

interface NavButtonProps extends ButtonProps {
  href: string;
}

const Header: FunctionComponent = () => {
  const [ menuOpen, setMenuOpen ] = useState<boolean>(false);

  const NavButton = ({ href, ...props }: NavButtonProps) => (
    <Link href={href} onClick={() => setMenuOpen(false)} passHref>
      <Button
        sx={{
          borderRadius: '50px',
          fontSize: '16px',
          padding: '.5rem 1rem',
          textTransform: 'none'
        }}
        {...props}
      />
    </Link>
  );

  return (
    <header id='top' className={classes.root}>
      <nav className={classes.nav}>
        <div className={classes.main}>
          <Link className={classes.logo} href='/'>
            <PictogrammersLogo className={classes.monogram} title='Pictogrammers Monogram' />
            <PictogrammersWordmark className={classes.wordmark} title='Pictogrammers' />
          </Link>
          <div className={cx(classes.options, {
            [classes.open]: menuOpen
          })}>
            <NavButton href='/libraries'>Icons & Fonts</NavButton>
            <NavButton href='/docs'>Docs</NavButton>
            <NavButton href='/tools'>Tools</NavButton>
            <NavButton href='/docs/general/about'>About</NavButton>
            <NavButton href='/docs/contribute'>Contribute</NavButton>
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
      <SiteSearch />
      <div className={classes.github}>
        <IconButton href='https://github.com/Pictogrammers'>
          <Icon path={siGithub.path} color='hsl(var(--primary-color))' size={.9} />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
