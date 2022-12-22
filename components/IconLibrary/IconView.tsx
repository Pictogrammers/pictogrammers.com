import { FunctionComponent } from 'react';
import getConfig from 'next/config';
import Head from 'next/head';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mdi/react';
import { mdiDownload, mdiSvg } from '@mdi/js';

import { IconLibrary, IconLibraryIcon } from '../../interfaces/icons';

import IconPreview from '../IconPreview/IconPreview';
import Contributors from '../Docs/Contributors/Contributors';

import classes from './IconView.module.scss';

interface IconViewProps {
  icon: IconLibraryIcon;
  library: string;
}

const IconView: FunctionComponent<IconViewProps> = ({ icon, library }) => {
  const {
    a: author,
    cp: codepoint,
    n: name,
    p: path
  } = icon;

  const { publicRuntimeConfig: { libraries: { icons: iconLibraries } } } = getConfig();
  const { gridSize = 24 } = iconLibraries.find((lib: IconLibrary) => lib.id === library);

  return (
    <div className={classes.root}>
      <Head>
        <title>Icons - Pictogrammers</title>
        <meta content='Icons - Pictogrammers' name='title' key='title' />
      </Head>
      <Paper className={classes.container}>
        <div className={classes.heading}>
          <Tooltip placement='top' title='Copy Icon Name'>
            <h1>{name}</h1>
          </Tooltip>
          <div className={classes.actions}>
            <Tooltip placement='top' title='Copy Codepoint'>
              <Chip label={codepoint} />
            </Tooltip>
            <Tooltip placement='top' title='Copy Glyph'>
              <Icon path={path} size={1} />
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
        <IconPreview gridSize={gridSize} path={path} />
        <Contributors id={author} view='single' />
      </Paper>
    </div>
  );
};

export default IconView;
