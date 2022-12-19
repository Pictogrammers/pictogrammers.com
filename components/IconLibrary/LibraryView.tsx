import { FunctionComponent, useEffect, useState } from 'react';
import Head from 'next/head';
import Paper from '@mui/material/Paper';
import { Virtuoso } from 'react-virtuoso';

import useProvisionDatabase from '../../hooks/useProvisionDatabase';

import classes from './LibraryView.module.scss';

interface LibraryViewProps {
  library: string;
  slug: string;
}

function generateItems(length: number) {
  return Array.from({ length }, (_, index) => `My Item ${index}`);
}

const LibraryView: FunctionComponent<LibraryViewProps> = ({ library, slug }) => {
  const [ database, setDatabase ] = useState(null);

  useProvisionDatabase(library, setDatabase);

  // TODO: The database query should only include the rows currently
  // visible in the dom.
  // TODO: Filter various items in the DOM should affect the query.
  useEffect(() => {
    const getIcons = async () => {
      if (!database) {
        return;
      }

      const rows = await database.table('icons').toArray();
      console.log(rows);
    };
    getIcons();
  }, [ database ]);

  return (
    <div className={classes.root}>
      <Head>
        <title>Icons - Pictogrammers</title>
        <meta content='Icons - Pictogrammers' name='title' key='title' />
      </Head>
      <Paper className={classes.container}>
        {!database && <div>Loading...</div>}
        <h2>{library}</h2>
        <Virtuoso
          useWindowScroll
          data={generateItems(200)}
          itemContent={(index, user) => (
            <div
              style={{
                backgroundColor: 'red',
                padding: '1rem 0.5rem',
              }}
            >
              <h4>A icon</h4>
              <div style={{ marginTop: '1rem' }}>A desc</div>
            </div>
          )}
        />
      </Paper>
    </div>
  );
};

export default LibraryView;
