import { FunctionComponent, ReactNode } from 'react';
import cx from 'clsx';
import Icon from '@mdi/react';
import { mdiCloudOutline } from '@mdi/js';

import ConditionalWrapper from '../ConditionalWrapper/ConditionalWrapper';
import useWindowSize from '../../hooks/useWindowSize';

import classes from './LandingPageHeading.module.scss';

interface LandingPageHeadingProps {
  className?: string;
  color?: string;
  description: string;
  graphicElement?: ReactNode;
  hideImageOnMobile?: boolean;
  icon?: string;
  showClouds?: boolean;
  superTitle?: string | ReactNode;
  title: string;
}

const LandingPageHeading: FunctionComponent<LandingPageHeadingProps> = ({
  className,
  color,
  description,
  graphicElement,
  hideImageOnMobile = true,
  icon,
  showClouds = true,
  superTitle,
  title
}) => {
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width > 0 && windowSize.width <= parseInt(classes['mobile-width']);

  return (
    <div
      className={cx(classes.root, className, {
        [classes.hideImage]: hideImageOnMobile && isMobileWidth
      })}
    >
      <div className={classes.title}>
        <h1
          style={{
            borderImage: color ? `linear-gradient(to right, hsl(var(${color})) 1%, hsl(var(${isMobileWidth ? color : '--white'})) 70%) 0 0 100% 0/1px 0 1px 0 stretch` : undefined
          }}
        >
          {superTitle && typeof superTitle === 'string' ? <span>{superTitle}</span> : superTitle}
          {title}
        </h1>
        <p>{description}</p>
      </div>
      <div className={classes.imageContainer}>
        <ConditionalWrapper
          condition={showClouds}
          wrapper={(children: any) => (
            <div className={classes.iconContainer}>
              <div className={classes.clouds}>
                <Icon path={mdiCloudOutline} size={4} />
                <Icon path={mdiCloudOutline} size={3} horizontal />
                <Icon path={mdiCloudOutline} size={4} />
              </div>
              {children}
            </div>
          )}
        >
          {graphicElement ? graphicElement : icon ? <Icon path={icon} size={7} color={`hsl(var(${color ? color : '--primary-color'}))`} /> : null}
        </ConditionalWrapper>
      </div>
    </div>
  );
};

export default LandingPageHeading;