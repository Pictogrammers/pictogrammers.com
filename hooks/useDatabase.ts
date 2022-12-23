import { useEffect, useState } from 'react';
import Dexie from 'dexie';
import slugify from 'slugify';

interface ImportPaths {
  default: {
    [key: string]: {
      count: number;
      version: string;
    };
  }
}

const useProvisionDatabase = (libraryId: string) => {
  const [ database, setDatabase ] = useState<any>();

  useEffect(() => {
    if (!libraryId) {
      return;
    }

    const provisionDb = async () => {
      const db = new Dexie(`pg-icons-${libraryId}`);

      // Set the version
      const { default: allLibraries } = await import('../public/libraries/libraries.json') as ImportPaths;
      const { count } = allLibraries[libraryId];
  
      // Open the database
      db.version(count).stores({
        icons: '&n, v, *t, *st',
        tags: '&id, &name, &slug'
      });

      // Check the icons table
      const dbIconCount = await db.table('icons').count();

      // If the table count doesn't match the version, fill it
      if (dbIconCount < count) {
        const { default: fullLibrary } = await import(`../public/libraries/${libraryId}.json`);
        const { i: icons, t: tags } = fullLibrary;
        await db.table('icons').bulkPut(icons);
        await db.table('tags').bulkPut(tags.map((tag: string, i: number) => ({ id: i, name: tag, slug: slugify(tag, { lower: true }) })));
        console.log(`Populated ${libraryId} library with ${await db.table('icons').count()} icons.`);
      }

      setDatabase(db);
    };

    provisionDb();
  }, [ libraryId ]);
  
  return database;
};

export default useProvisionDatabase;