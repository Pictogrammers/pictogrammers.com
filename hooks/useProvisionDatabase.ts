import { useEffect } from 'react';
import Dexie from 'dexie';

interface ImportPaths {
  default: {
    [key: string]: number;
  }
}

const useProvisionDatabase = (library: string, cb: Function) => {
  useEffect(() => {
    if (!library) {
      return;
    }

    const provisionDb = async () => {
      const db = new Dexie(`pg-icons-${library}`);

      // Set the version
      const { default: allLibraries } = await import('../public/libraries/libraries.json') as ImportPaths;
      const version = allLibraries[library];
  
      // Open the database
      db.version(version).stores({ icons: '&id, *name, *jsName' });

      // Check the icons table
      const dbIconCount = await db.table('icons').count();

      // If the table count doesn't match the version, fill it
      if (dbIconCount < version) {
        const { default: fullLibrary } = await import(`../public/libraries/${library}.json`);
        await db.table('icons').bulkPut(fullLibrary);
        console.log(`Populated ${library} library with ${await db.table('icons').count()} icons.`);
      }

      cb && cb(db);
    };

    provisionDb();
  }, [ cb, library ]);
};

export default useProvisionDatabase;