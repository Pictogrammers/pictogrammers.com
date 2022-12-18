import { FunctionComponent } from 'react';
import Head from 'next/head';
// import Dexie from 'dexie';

import classes from './LibraryView.module.scss';

interface LibraryViewProps {
  library: string;
  slug: string;
}

// interface ImportPaths {
//   default: {
//     [key: string]: number;
//   }
// }

// const openLibraryDb = async (libraryId: string) => {
//   try {
//     const db = new Dexie(`pg-icons-${libraryId}`);
  
//     // Set the version
//     const { default: allLibraries } = await import('../../public/libraries/libraries.json') as ImportPaths;
//     const version = allLibraries[libraryId];

//     // Open the database
//     db.version(version).stores({ icons: '&id, *name, *jsName' });

//     // Check the icons table
//     const dbIconCount = await db.table('icons').count();

//     // If the table count doesn't match the version, fill it
//     if (dbIconCount < version) {
//       const { default: fullLibrary } = await import(`../../public/libraries/${libraryId}.json`);
//       await db.table('icons').bulkPut(fullLibrary);
//       console.log(`Populated ${libraryId} library with ${await db.table('icons').count()} icons.`);
//     }

//     return db;
//   } catch (err) {
//     console.error(err);
//   }
// };

const LibraryView: FunctionComponent<LibraryViewProps> = ({ library, slug }) => {
  return (
    <div className={classes.root}>
      <Head>
        <title>Icons - Pictogrammers</title>
        <meta content='Icons - Pictogrammers' name='title' key='title' />
      </Head>
      {library}
    </div>
  );
};

export default LibraryView;
