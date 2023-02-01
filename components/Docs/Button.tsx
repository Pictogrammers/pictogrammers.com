import { FunctionComponent, ReactNode } from 'react';
import cx from 'clsx';
import { ButtonProps, Button as MuiButton } from '@mui/material';

import { IconLibraries } from '../../interfaces/icons';

import Icon from './Icon';
import Link from '../Link/Link';

import classes from './components.module.scss';

interface CustomButtonProps extends ButtonProps {
  availableIcons?: IconLibraries;
  endIcon?: string | ReactNode;
  href: string;
  node?: any;
  startIcon?: string | ReactNode;
}

const Button: FunctionComponent<CustomButtonProps> = ({
  availableIcons,
  children,
  endIcon,
  href,
  node,
  startIcon,
  variant = 'outlined',
  ...rest
}) => {
  const renderIcon = (icon: string | ReactNode) => {
    if (typeof icon === 'string') {
      const size = icon.startsWith('si') ? .9 : 1;
      return <Icon availableIcons={availableIcons} name={icon} size={size} />;
    }

    return icon;
  };

  return (
    <MuiButton
      classes={{
        root: cx(classes.button, {
          [classes.darkButton]: variant === 'contained',
          [classes.lightButton]: variant !== 'contained'
        })
      }}
      component={Link}
      endIcon={renderIcon(endIcon)}
      href={href}
      startIcon={renderIcon(startIcon)}
      variant={variant}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;