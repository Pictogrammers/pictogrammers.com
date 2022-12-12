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

  return (
    <MuiButton
      classes={{
        root: cx(classes.button, {
          [classes.darkButton]: variant === 'contained',
          [classes.lightButton]: variant !== 'contained'
        })
      }}
      startIcon={typeof startIcon === 'string' ? <Icon name={startIcon} availableIcons={availableIcons} /> : startIcon}
      endIcon={typeof endIcon === 'string' ? <Icon name={endIcon} availableIcons={availableIcons} /> : endIcon}
      variant={variant}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;