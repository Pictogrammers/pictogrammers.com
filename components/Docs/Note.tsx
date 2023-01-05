import { FunctionComponent } from 'react';
import { ReactNode } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import classes from './components.module.scss';

interface NoteProps {
  children: ReactNode;
  title?: string;
  type?: AlertColor;
}

const Note: FunctionComponent<NoteProps> = ({ children, title, type = 'info' }) => {
  return (
    <Alert className={classes.alert} severity={type}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  );
};

export default Note;