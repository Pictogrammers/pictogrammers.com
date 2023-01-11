import { FunctionComponent, ReactNode } from 'react';
import cx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import Badge, { BadgeProps } from '@mui/material/Badge';
import Chip, { ChipTypeMap } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Icon from '@mdi/react';

import ConditionalWrapper from '../ConditionalWrapper/ConditionalWrapper';

import classes from './LandingPageCard.module.scss';

interface LandingPageCardProps {
  badge?: ReactNode | false;
  chip?: ChipTypeMap['props'];
  color?: string;
  description: string;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  icon?: string;
  image?: string;
  superTitle?: string;
  title: string;
};

const StyledBadge = styled(Badge)<BadgeProps>(() => ({'& .MuiBadge-badge': { bottom: 5, right: 5 }}));

const LandingPageCard: FunctionComponent<LandingPageCardProps> = ({ badge, chip, color, description, disabled, fullWidth, href, icon, image, superTitle, title }) => {
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
        <ConditionalWrapper
          condition={!!badge}
          wrapper={(children: any) => (
            <StyledBadge anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} badgeContent={badge}>
              {children}
            </StyledBadge>
          )}
        >
          {image && <Image alt={`${title} Image`} height={64} src={`/${image}`} width={64} />}
          {icon && <Icon className={classes.noImage} color={`hsl(var(${color}))`} path={icon} size={2.667} style={{ backgroundColor: `hsl(var(${color}) / 10%)` }} />}
        </ConditionalWrapper>
        {chip && <Chip label={chip.label} color={chip.color} />}
      </div>
      <div className={classes.info}>
        <h3>
          {superTitle && <span>{superTitle}</span>}
          {title}
        </h3>
        <p className={classes.subtext}>{description}</p>
      </div>
    </Wrapper>
  );
};

export default LandingPageCard;