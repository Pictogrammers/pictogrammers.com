import { FunctionComponent } from 'react';
import Head from 'next/head';

import { IconLibraryIcon } from '../../interfaces/icons';

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
      {JSON.stringify(icon)}
    </div>
  );
};

export default IconView;
