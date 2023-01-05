import { FunctionComponent, ReactNode } from 'react';
import Link from 'next/link';
import cx from 'clsx';
import { ButtonProps, Button as MuiButton } from '@mui/material';

import { IconLibraries } from '../../interfaces/icons';

import Icon from './Icon';

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
    <Link className={classes.button} href={href} passHref>
      <MuiButton
        classes={{
          root: cx({
            [classes.darkButton]: variant === 'contained',
            [classes.lightButton]: variant !== 'contained'
          })
        }}
        startIcon={renderIcon(startIcon)}
        endIcon={renderIcon(endIcon)}
        variant={variant}
        {...rest}
      >
        {children}
      </MuiButton>
    </Link>
  );
};

export default Button;