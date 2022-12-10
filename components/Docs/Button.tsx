import { ReactNode } from 'react';
import cx from 'clsx';
import { ButtonProps, Button as MuiButton } from '@mui/material';

import Icon from './Icon';

import classes from './components.module.scss';

interface IButton extends ButtonProps {
  node?: any;
  startIcon?: string | ReactNode;
  endIcon?: string | ReactNode;
}

const Button = (props: IButton) => {
  const { children, endIcon, node, startIcon, variant = 'outlined', ...rest } = props;

  return (
    <MuiButton
      classes={{
        root: cx(classes.button, {
          [classes.darkButton]: variant === 'contained',
          [classes.lightButton]: variant !== 'contained'
        })
      }}
      startIcon={typeof startIcon === 'string' ? <Icon name={startIcon} /> : startIcon}
      endIcon={typeof endIcon === 'string' ? <Icon name={endIcon} /> : endIcon}
      variant={variant}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;