import { FunctionComponent } from 'react';
import cx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import Chip, { ChipTypeMap } from '@mui/material/Chip';
import Icon from '@mdi/react';

import classes from './LandingPageCard.module.scss';

interface LandingPageCardProps {
  chip?: ChipTypeMap['props'];
  color?: string;
  description: string;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  icon?: string;
  image?: string;
  title: string;
};

const LandingPageCard: FunctionComponent<LandingPageCardProps> = ({ chip, color, description, disabled, fullWidth, href, icon, image, title }) => {
  const Wrapper = !href ? 'div' : Link;

  return (
    <Wrapper
      className={cx(classes.root, {
        [classes.full]: fullWidth,
        [classes.disabled]: disabled
      })}
      href={!href ? '#' : href}
    >
      <div className={classes.images}>
        {image && <Image alt={`${title} Image`} height={64} src={`/${image}`} width={64} />}
        {icon && <Icon className={classes.noImage} color={`hsl(var(${color}))`} path={icon} size={2.667} style={{ backgroundColor: `hsl(var(${color}) / 10%)` }} />}
        {chip && <Chip label={chip.label} color={chip.color} />}
      </div>
      <div className={classes.info}>
        <h3>{title}</h3>
        <p className={classes.subtext}>{description}</p>
      </div>
    </Wrapper>
  );
};

export default LandingPageCard;