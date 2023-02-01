import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import getConfig from 'next/config';
import Cookies from 'js-cookie';
import { useAnalytics } from 'use-analytics';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

import classes from './CookieConsent.module.scss';

declare module '@mui/material/Button' {
  // eslint-disable-next-line no-unused-vars
  interface ButtonPropsColorOverrides {
    white: true
  }
}

const CookieConsent: FunctionComponent = () => {
  const { publicRuntimeConfig: { analytics: config } } = getConfig();
  const [ showConsentModal, setShowConsentModal ] = useState(false);
  const { page, plugins } = useAnalytics();

  useEffect(() => {
    const cookieValue = Cookies.get(config.consentCookie);
    if (!cookieValue) {
      return setShowConsentModal(true);
    }

    if (cookieValue === 'agreed') {
      plugins.enable('google-analytics');
    }
  }, [ config.consentCookie, page, plugins ]);

  const handleDoNotTrack = () => {
    Cookies.set(config.consentCookie, 'do-not-track', { expires: config.consentCookieExpiration });
    setShowConsentModal(false);
  };

  const handleAgreement = () => {
    Cookies.set(config.consentCookie, 'agreed', { expires: config.consentCookieExpiration });
    plugins.enable('google-analytics').then(() => page());;
    setShowConsentModal(false);
  };

  if (showConsentModal) {
    return (
      <Snackbar
        action={
          <div className={classes.buttons}>
            <Button color='white' onClick={handleDoNotTrack}>Do Not Track</Button>
            <Button color='success' onClick={handleAgreement} variant='contained'>I Understand</Button>
          </div>
        }
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
        ContentProps={{
          className: classes.root
        }}
        message={
          <Fragment>
            <h2>About Your Privacy</h2>
            <p>We use cookies to improve your browsing experience and analyze our website traffic.</p>
          </Fragment>
        }
        open
      />
    );
  }

  return null;
};

export default CookieConsent;