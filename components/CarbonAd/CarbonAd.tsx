import { FunctionComponent } from 'react';
import cx from 'clsx';

import useWindowSize from '../../hooks/useWindowSize';

import classes from './CarbonAd.module.scss';

interface CarbonAdProps {
  displayOnMobile?: boolean;
}

const CarbonAd: FunctionComponent<CarbonAdProps> = ({ displayOnMobile = false }) => {
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width <= parseInt(classes['mobile-width']);

  const shouldHide = isMobileWidth && !displayOnMobile;

  return (
    <div className={cx(classes.root, {
      [classes.hide]: shouldHide
    })}>
      &nbsp;
    </div>
  );
};

export default CarbonAd;