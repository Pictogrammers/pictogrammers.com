import { FunctionComponent } from 'react';
import Head from 'next/head';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mdi/react';
import { mdiDownload, mdiSvg } from '@mdi/js';

import { IconLibraryIcon } from '../../interfaces/icons';

import IconPreview from '../IconPreview/IconPreview';
import Contributors from '../Docs/Contributors/Contributors';

import classes from './IconView.module.scss';

interface IconViewProps {
  icon: IconLibraryIcon;
  slug: string;
}

const IconView: FunctionComponent<IconViewProps> = ({ icon, slug }) => {
  return (
    <div className={classes.root}>
      <Head>
        <title>Icons - Pictogrammers</title>
        <meta content='Icons - Pictogrammers' name='title' key='title' />
      </Head>
      <Paper className={classes.container}>
        <div className={classes.heading}>
          <Tooltip placement='top' title='Copy Icon Name'>
            <h1>{icon.name}</h1>
          </Tooltip>
          <div className={classes.actions}>
            <Tooltip placement='top' title='Copy Codepoint'>
              <Chip label={icon.codepoint} />
            </Tooltip>
            <Tooltip placement='top' title='Copy Glyph'>
              <Icon path={icon.path} size={1} />
            </Tooltip>
            <Tooltip placement='top' title='Copy SVG'>
              <Icon path={mdiSvg} size={1} />
            </Tooltip>
            <Tooltip placement='top' title='Download SVG'>
              <Icon path={mdiDownload} size={1} />
            </Tooltip>
          </div>
        </div>
        {JSON.stringify(icon)}
        <IconPreview gridSize={24} path={icon.path} />
        <Contributors name={icon.author} view='single' />
      </Paper>
    </div>
  );
};

export default IconView;
