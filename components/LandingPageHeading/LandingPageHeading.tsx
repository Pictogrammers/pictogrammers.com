import { FunctionComponent } from 'react';
import Image, { StaticImageData } from 'next/image';
import Icon from '@mdi/react';
import { mdiCloudOutline } from '@mdi/js';

import classes from './LandingPageHeading.module.scss';

interface LandingPageHeadingProps {
  description: string;
  icon?: {
    color?: string;
    path: string;
  };
  image?: {
    alt: string;
    height: number;
    src: string | StaticImageData;
    width: number;
  }
  superTitle?: string;
  title: string;
}

const LandingPageHeading: FunctionComponent<LandingPageHeadingProps> = ({ description, icon, image, superTitle, title }) => {
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h1>
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
          <Icon path={icon.path} size={7} color={icon.color ? icon.color : 'hsl(var(--primary-color))'} />
        </div>
      )}
    </div>
  );
};

export default LandingPageHeading;