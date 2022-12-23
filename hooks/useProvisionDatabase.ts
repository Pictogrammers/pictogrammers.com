import { useEffect, useState } from 'react';
import Dexie from 'dexie';

interface ImportPaths {
  default: {
    [key: string]: {
      count: number;
      version: string;
    };
  }
}

const useProvisionDatabase = (library: string) => {
  const [ database, setDatabase ] = useState<any>();

  useEffect(() => {
    if (!library) {
      return;
    }

    const provisionDb = async () => {
      const db = new Dexie(`pg-icons-${library}`);

      // Set the version
      const { default: allLibraries } = await import('../public/libraries/libraries.json') as ImportPaths;
      const { count } = allLibraries[library];
  
      // Open the database
      db.version(count).stores({
        icons: '&n, v, *t, *st',
        tags: '&id, &name'
      });

      // Check the icons table
      const dbIconCount = await db.table('icons').count();

      // If the table count doesn't match the version, fill it
      if (dbIconCount < count) {
        const { default: fullLibrary } = await import(`../public/libraries/${library}.json`);
        const { a: authors, i: icons, t: tags } = fullLibrary;
        await db.table('icons').bulkPut(icons);
        await db.table('tags').bulkPut(tags.map((tag: string, i: number) => ({ id: i, name: tag })));
        console.log(`Populated ${library} library with ${await db.table('icons').count()} icons.`);
      }

      setDatabase(db);
    };

    provisionDb();
  }, [ library ]);
  
  return database;
};

export default useProvisionDatabase;