import { ReactNode } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import classes from './components.module.scss';

interface NoteProps {
  children: ReactNode;
  title?: string;
  type?: AlertColor;
}

const Note = (props: NoteProps) => {
  const { children, title, type = 'info' } = props;

  return (
    <Alert className={classes.alert} severity={type}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  );
};

export default Note;