import { ChangeEvent, FunctionComponent, useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Icon from '@mdi/react';
import { mdiAccount, mdiFileUploadOutline, mdiHelpCircleOutline } from '@mdi/js';

import usePreviewCanvas from '../../hooks/usePreviewCanvas';
import useWindowSize from '../../hooks/useWindowSize';

import classes from './IconPreviewGenerator.module.scss';

const IconPreviewGenerator: FunctionComponent = () => {
  const [ iconName, setIconName ] = useState('account');
  const [ iconPath, setIconPath ] = useState(mdiAccount);
  const [ iconShadow, setIconShadow ] = useState('');
  const [ workInProgress, setWorkInProgress ] = useState(true);

  const canvas = usePreviewCanvas(iconName, iconPath, workInProgress, iconShadow);

  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width <= parseInt(classes['mobile-width']);

  return (
    <Paper classes={{ root: classes.root }} variant='outlined'>
      <div className={classes.form}>
        <TextField
          label='Icon Name'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Tooltip placement='top' title='View Icon Naming Guide'>
                  <IconButton href='/docs/guides/icon-naming'>
                    <Icon path={mdiHelpCircleOutline} size={1} />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setIconName(e.target.value)}
          value={iconName}
        />
        <TextField
          label='Path Data'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Tooltip placement='top' title='Upload an SVG'>
                  <IconButton onClick={() => alert('Not yet buddy')}>
                    <Icon path={mdiFileUploadOutline} size={1} />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setIconPath(e.target.value)}
          value={iconPath}
        />
        <TextField
          label='Optional Shadow Path Data'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setIconShadow(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Tooltip placement='top' title='Upload an SVG'>
                  <IconButton onClick={() => alert('Not yet buddy')}>
                    <Icon path={mdiFileUploadOutline} size={1} />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
          value={iconShadow}
        />
        <FormControlLabel
          control={<Switch checked={workInProgress} onChange={(e: ChangeEvent<HTMLInputElement>) => setWorkInProgress(e.target.checked)} />}
          label='Work in Progress?'
          labelPlacement='start'
        />
      </div>
      <div className={classes.preview}>
        <canvas height='294' ref={canvas} width='325' />
        <Alert severity='info'>
          {isMobileWidth ? 'Tap and hold to' : 'Right-click and'} copy the image above. Paste into the GitHub comment area to attach the preview.
        </Alert>
      </div>
    </Paper>
  );
};

export default IconPreviewGenerator;