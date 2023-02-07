import { FunctionComponent, useEffect, useRef } from 'react';
import getConfig from 'next/config';
import cx from 'clsx';

import useWindowSize from '@/hooks/useWindowSize';

import classes from './CarbonAd.module.scss';

interface CarbonAdProps {
  displayOnMobile?: boolean;
}

const CarbonAd: FunctionComponent<CarbonAdProps> = ({ displayOnMobile = false }) => {
  const carbonAdsRef = useRef<HTMLDivElement | null>(null);
  const { publicRuntimeConfig: { carbonAds } } = getConfig();
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width > 0 && windowSize.width <= parseInt(classes['mobile-width']);

  useEffect(() => {
    if (carbonAdsRef.current && !carbonAdsRef.current.childNodes.length) {
      const carbonScript = document.createElement('script');
      carbonScript.src = `//cdn.carbonads.com/carbon.js?serve=${carbonAds.serve}&placement=${carbonAds.placement}`;
      carbonScript.id = '_carbonads_js';
      carbonScript.async = true;
      carbonAdsRef.current.appendChild(carbonScript);
    }

    return () => {
      carbonAdsRef.current = null;
    };
  }, [ carbonAds ]);

  return (
    <div
      className={cx(classes.root, {
        [classes.hide]: isMobileWidth && !displayOnMobile
      })}
      ref={carbonAdsRef}
    />
  );
};

export default CarbonAd;