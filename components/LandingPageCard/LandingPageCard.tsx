import { FunctionComponent } from 'react';
import cx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import Chip, { ChipTypeMap } from '@mui/material/Chip';
import Icon from '@mdi/react';

import classes from './LandingPageCard.module.scss';

interface LandingPageCardProps {
  chip?: ChipTypeMap['props'];
  description: string;
  disabled?: boolean;
  href?: string;
  icon?: {
    color?: string;
    path: string;
  };
  image?: string;
  title: string;
};

const LandingPageCard: FunctionComponent<LandingPageCardProps> = ({ chip, description, disabled, href, icon, image, title }) => {
  const Wrapper = !href ? 'div' : Link;

  return (
    <Wrapper
      className={cx(classes.root, {
        [classes.disabled]: disabled
      })}
      href={!href ? '#' : href}
    >
      <div className={classes.images}>
        {image && <Image alt={`${title} Image`} height={64} src={`/${image}`} width={64} />}
        {icon && <Icon className={classes.noImage} color={icon.color} path={icon.path} size={2.667} />}
        {chip && <Chip label={chip.label} color={chip.color} />}
      </div>
      <div>
        <h2>{title}</h2>
        <p className={classes.subtext}>{description}</p>
      </div>
    </Wrapper>
  );
};

export default LandingPageCard;