import { ReactNode } from 'react';
import cx from 'clsx';
import { ButtonProps, Button as MuiButton } from '@mui/material';

import { IconLibraries } from '../../interfaces/icons';

import Icon from './Icon';

import classes from './components.module.scss';

interface IButton extends ButtonProps {
  node?: any;
  startIcon?: string | ReactNode;
  endIcon?: string | ReactNode;
  availableIcons?: IconLibraries;
}

const Button = (props: IButton) => {
  const { availableIcons, children, endIcon, node, startIcon, variant = 'outlined', ...rest } = props;

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
      startIcon={renderIcon(startIcon)}
      endIcon={renderIcon(endIcon)}
      variant={variant}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;