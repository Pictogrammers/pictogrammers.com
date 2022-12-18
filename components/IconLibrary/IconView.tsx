import { FunctionComponent } from 'react';
import Head from 'next/head';
import Paper from '@mui/material/Paper';

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
        {JSON.stringify(icon)}
        <IconPreview gridSize={24} path={icon.path} />
        <Contributors name={icon.author} view='single' />
      </Paper>
    </div>
  );
};

export default IconView;
