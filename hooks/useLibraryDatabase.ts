import { useEffect } from 'react';
import Dexie from 'dexie';
import getConfig from 'next/config';

interface IconLibraryProps {
  description: string;
  id: string;
  image: string;
  name: string;
  package: string;
}

interface ImportPaths {
  default: {
    [key: string]: number;
  }
}

const useLibraryDatabase = () => {
  const { publicRuntimeConfig: config } = getConfig();

  useEffect(() => {
    const provisionDb = async (libraryId: string) => {
      try {
        const db = new Dexie(`pg-icons-${libraryId}`);
      
        // Set the version
        const { default: allLibraries } = await import('../public/libraries/libraries.json') as ImportPaths;
        const version = allLibraries[libraryId];
    
        // Open the database
        db.version(version).stores({ icons: '&id, *name, *jsName' });
    
        // Check the icons table
        const dbIconCount = await db.table('icons').count();
    
        // If the table count doesn't match the version, fill it
        if (dbIconCount < version) {
          const { default: fullLibrary } = await import(`../public/libraries/${libraryId}.json`);
          await db.table('icons').bulkPut(fullLibrary);
          console.log(`Populated ${libraryId} library with ${await db.table('icons').count()} icons.`);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const { libraries: { icons } } = config;
    icons.forEach((il: IconLibraryProps) => provisionDb(il.id));
  }, [ config ]);
};

export { useLibraryDatabase };