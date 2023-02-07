import { FunctionComponent } from 'react';
import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiHeart } from '@mdi/js';

import PictogrammersLogo from '@/public/images/pictogrammers-logo.svg';

import classes from './Footer.module.scss';

const Footer: FunctionComponent = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={classes.root}>
      <div className={classes.main}>
        <div className={classes.summary}>
          <Link aria-label='Return to the Pictogrammers Home' className={classes.logo} href='/'>
            <PictogrammersLogo />
          </Link>
          <div>
            <h3>Open-source iconography for designers and developers</h3>
            <p>We&apos;re a collective of passionate individuals creating beautiful icon and font libraries for drop-in use in your designs and development.</p>
            <p>Made with <Icon className={classes.heart} path={mdiHeart} size={.8} /> from all over the world!</p>
          </div>
        </div>

        <div className={classes.columns}>
          <div>
            <h3>Libraries</h3>
            <p><Link href='/library/mdi/'>Material Design Icons</Link></p>
            <p><Link href='/library/mdil/'>MDI Light</Link></p>
            <p><Link href='/library/memory/'>Memory Icons</Link></p>
            <p><Link href='/libraries/'>View All</Link></p>
          </div>
          <div>
            <h3>Community</h3>
            <p><Link href='/docs/contribute/'>Contribute</Link></p>
            <p><Link href='/docs/contribute/contributors/'>Contributors</Link></p>
            <p><Link href='https://github.com/Pictogrammers'>GitHub</Link></p>
            <p><Link href='https://fosstodon.org/@pictogrammers' rel='me'>Mastodon</Link></p>
          </div>
          <div>
            <h3>Help</h3>
            <p><Link href='/docs/'>Documentation</Link></p>
            <p><Link href='/docs/general/license/'>License</Link></p>
            <p><Link href='mailto:contact@pictogrammers.com'>Contact Us</Link></p>
          </div>
        </div>
      </div>
      <div className={classes.legal}>
        <div>
          <p><Link href='/docs/general/privacy-policy/'>Privacy Policy</Link></p>
          <p><Link href='/docs/contribute/code-of-conduct/'>Code of Conduct</Link></p>
        </div>
        <p className={classes.copyright}>© {year} Pictogrammers</p>
      </div>
    </footer>
  );
};

export default Footer;
