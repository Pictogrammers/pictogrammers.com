import { ChangeEvent, FunctionComponent, SyntheticEvent, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import { useSnackbar } from 'notistack';
import Icon from '@mdi/react';
import { mdiAccount, mdiCloseCircle, mdiFileUploadOutline, mdiHelpCircleOutline } from '@mdi/js';

import usePreviewCanvas from '../../hooks/usePreviewCanvas';
import useWindowSize from '../../hooks/useWindowSize';

import classes from './IconPreviewGenerator.module.scss';

const IconPreviewGenerator: FunctionComponent = () => {
  const svgUploader = useRef<HTMLInputElement>(null);

  const [ iconName, setIconName ] = useState('account');
  const [ iconPath, setIconPath ] = useState(mdiAccount);
  const [ iconShadow, setIconShadow ] = useState('');
  const [ workInProgress, setWorkInProgress ] = useState(true);
  const [ uploadType, setUploadType ] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const canvas = usePreviewCanvas(iconName, iconPath, workInProgress, iconShadow);

  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width <= parseInt(classes['mobile-width']);

  const triggerSvgUpload = (type: string) => {
    if (!svgUploader.current) {
      return;
    }
    setUploadType(type);
    svgUploader.current.click();
  };

  const handleUpload = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.files === null || !target.files.length) {
      enqueueSnackbar('No file was selected to upload.', { variant: 'error' });
      return;
    }

    const file = target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      target.value = '';

      const fileContents = reader.result as string;
      const pathData = [...fileContents?.matchAll(/ d="([^"]+)"/g)];

      if (!pathData || pathData.length > 1) {
        enqueueSnackbar('Unable to find a singular `path` tag with a valid `d` attribute.', { variant: 'error' });
        return;
      }

      if (uploadType === 'path') {
        setIconName(file.name.replace('.svg', ''));
        setIconPath(pathData[0][1]);
      }
      if (uploadType === 'shadow') {
        setIconShadow(pathData[0][1]);
      }
    });
    reader.addEventListener('error', () => enqueueSnackbar('Failed to read uploaded file.', { variant: 'error' }));
    reader.readAsText(file);
  };

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
          multiline
          rows={3}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {iconPath !== '' && (
                  <Tooltip placement='top' title='Clear Path Data'>
                    <IconButton onClick={() => setIconPath('')}>
                      <Icon path={mdiCloseCircle} size={1} />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip placement='top' title='Upload an SVG'>
                  <IconButton onClick={() => triggerSvgUpload('path')}>
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
          multiline
          rows={3}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setIconShadow(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {iconShadow !== '' && (
                  <Tooltip placement='top' title='Clear Shadow Path Data'>
                    <IconButton onClick={() => setIconShadow('')}>
                      <Icon path={mdiCloseCircle} size={1} />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip placement='top' title='Upload an SVG'>
                  <IconButton onClick={() => triggerSvgUpload('shadow')}>
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
        <input
          accept='image/svg+xml'
          className={classes.hiddenInput}
          onChange={handleUpload}
          ref={svgUploader}
          type='file'
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