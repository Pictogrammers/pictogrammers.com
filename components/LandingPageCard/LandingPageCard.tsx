import { CSSProperties, FunctionComponent, ReactElement, ReactNode } from 'react';
import cx from 'clsx';
import Badge, { BadgeProps } from '@mui/material/Badge';
import Chip, { ChipTypeMap } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Icon from '@mdi/react';

import Link from '../Link/Link';
import ConditionalWrapper from '../ConditionalWrapper/ConditionalWrapper';

import classes from './LandingPageCard.module.scss';

interface LandingPageCardProps {
  badge?: ReactNode | false;
  chip?: ChipTypeMap['props'];
  color?: string;
  description: ReactNode | string;
  disabled?: boolean;
  fullWidth?: boolean;
  graphicElement?: ReactNode;
  headerElement?: string;
  href?: string;
  icon?: string;
  superTitle?: string;
  title: string;
};

const StyledBadge = styled(Badge)<BadgeProps>(() => ({'& .MuiBadge-badge': { bottom: 5, right: 5 }}));

const LandingPageCard: FunctionComponent<LandingPageCardProps> = ({
  badge,
  chip,
  color,
  description,
  disabled,
  fullWidth,
  graphicElement,
  headerElement = 'h2',
  href,
  icon,
  superTitle,
  title
}) => {
  const Wrapper = !href ? 'div' : Link;
  const Header = headerElement as any;

  return (
    <Wrapper
      className={cx(classes.root, {
        [classes.full]: fullWidth,
        [classes.disabled]: disabled
      })}
      href={!href ? '#' : href}
      style={{
        '--hover-color': `var(${color})`
      } as CSSProperties}
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
          {graphicElement ? graphicElement : icon ? <Icon className={classes.noImage} color={`hsl(var(${color}))`} path={icon} size={2.667} style={{ backgroundColor: `hsl(var(${color}) / 10%)` }} /> : null}
        </ConditionalWrapper>
        {chip && <Chip label={chip.label} color={chip.color} />}
      </div>
      <div className={classes.info}>
        <Header>
          {superTitle && <span>{superTitle}</span>}
          {title}
        </Header>
        <p className={classes.subtext}>{description}</p>
      </div>
    </Wrapper>
  );
};

export default LandingPageCard;