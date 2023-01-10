import { FunctionComponent } from 'react';
import Image, { StaticImageData } from 'next/image';
import Icon from '@mdi/react';
import { mdiCloudOutline } from '@mdi/js';

import classes from './LandingPageHeading.module.scss';

interface LandingPageHeadingProps {
  color?: string;
  description: string;
  icon?: string;
  image?: {
    alt: string;
    height: number;
    src: string | StaticImageData;
    width: number;
  }
  superTitle?: string;
  title: string;
}

const LandingPageHeading: FunctionComponent<LandingPageHeadingProps> = ({ color, description, icon, image, superTitle, title }) => {
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h1
          style={{
            borderImage: color ? `linear-gradient(to right, hsl(var(${color})) 1%, hsl(var(--white)) 70%) 0 0 100% 0/1px 0 1px 0 stretch` : undefined
          }}
        >
          {superTitle && <span>{superTitle}</span>}
          {title}
        </h1>
        <p>{description}</p>
      </div>
      {image && <Image alt={image.alt} height={image.height} src={image.src} width={image.width} />}
      {icon && (
        <div className={classes.iconContainer}>
          <div className={classes.clouds}>
            <Icon path={mdiCloudOutline} size={4} />
            <Icon path={mdiCloudOutline} size={3} horizontal />
            <Icon path={mdiCloudOutline} size={4} />
          </div>
          <Icon path={icon} size={7} color={`hsl(var(${color ? color : '--primary-color'}))`} />
        </div>
      )}
    </div>
  );
};

export default LandingPageHeading;