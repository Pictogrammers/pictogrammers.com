import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import getConfig from 'next/config';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Icon from '@mdi/react';
import { mdiCrop, mdiNumeric4 } from '@mdi/js';

import { IconLibrary } from '@/interfaces/icons';

import Head from '@/components/Head/Head';

import classes from '@/styles/pages/404.module.scss';

const ErrorBoundary: NextPage = () => {
  const [ resourceType, setResourceType ] = useState('');
  const [ alertMessage, setAlertMessage ] = useState<string | undefined>();

  useEffect(() => {
    const requestedPath = window.location.pathname;
    const pathParts = requestedPath.split('/');
    pathParts.shift();

    switch (pathParts?.[0]) {
      case 'library':
        if (!pathParts[2]) {
          setResourceType('library');
        } else if (pathParts?.[2] === 'icon') {
          const { publicRuntimeConfig: { libraries } } = getConfig();
          const libraryName = libraries.icons.find((library: IconLibrary) => library.id === pathParts[2])?.name;
          setResourceType('icon');
          setAlertMessage(`If you're looking for an icon that was just added to the library, it won't appear on the site until the next ${libraryName ? `${libraryName} ` : ''}release.`);
        }
        break;
      case 'docs':
        setResourceType('article');
        break;
      case 'tools':
        setResourceType('tool');
        break;
      case 'contributor':
        setResourceType('contributor');
        break;
    }
  }, []);

  return (
    <div className={classes.root}>
      <Head noIndex title='404 - Page Not Found' />
      <Paper className={classes.container}>
        <div className={classes.badge}>Page Not Found</div>
        <div className={classes.fourohfour}>
          <Icon path={mdiNumeric4} size={10} />
          <Icon path={mdiCrop} size={7} />
          <Icon path={mdiNumeric4} size={10} />
        </div>
        <div>
          <h1>Oh, mdiCrop.</h1>
          <p>We couldn&apos;t find that{resourceType ? ` ${resourceType}` : ''}. Please check the URL and try again.<br/>You can also try searching the site above.</p>
          {alertMessage && <Alert severity='info' sx={{ marginBottom: '1rem' }}>{alertMessage}</Alert>}
        </div>
      </Paper>
    </div>
  );
};

export default ErrorBoundary;
