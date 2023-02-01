import { FunctionComponent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mdi/react';
import { mdiHandWaveOutline } from '@mdi/js';

import useWindowSize from '../../hooks/useWindowSize';

import Link from '../Link/Link';

import classes from './MDIWelcome.module.scss';

interface MDIWelcomeProps {
  handleClose: Function;
}

const MDIWelcome: FunctionComponent<MDIWelcomeProps> = ({ handleClose }) => {
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width <= parseInt(classes['mobile-width']);

  return (
    <Dialog
      fullScreen={isMobileWidth}
      open
      onClose={() => handleClose(false)}
    >
      <DialogTitle
        sx={{
          backgroundColor: 'hsl(var(--mdi-color))',
          color: 'hsl(var(--white))',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        Welcome to the New Home of Material Design Icons!
      </DialogTitle>
      <DialogContent>
        <div className={classes.meet}>
          <Icon path={mdiHandWaveOutline} size={2} />
        </div>
        <p>The group that brought you <strong>Material Design Icons</strong> over the years have formed an open-source collective. You can learn all about it on our <Link href='/docs/general/about' onClick={() => handleClose(false)}>about</Link> page.</p>
        <p>Please update your bookmarks. We&apos;re glad you&apos;re here!</p>
        <p className={classes.issues}>If you have any issues with our new site, please <Link href='https://github.com/Pictogrammers/pictogrammers.com/issues'>open an issue</Link> on GitHub.</p>
      </DialogContent>
      <DialogActions
        sx={{
          borderTop: '1px solid hsl(var(--light-grey))',
          padding: '1rem'
        }}
      >
        <Button
          color='info'
          onClick={() => handleClose(false)}
          sx={{
            backgroundColor: 'hsl(var(--mdi-color))'
          }}
          variant='contained'
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MDIWelcome;
