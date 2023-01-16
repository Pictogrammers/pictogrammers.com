import { FunctionComponent, createContext, useContext, useEffect, useRef, useState } from 'react';
import Dexie from 'dexie';
import { useSnackbar } from 'notistack';
import { useAnalytics } from 'use-analytics';

interface DatabaseProviderProps {
  children: any;
}

interface ImportPaths {
  default: {
    [key: string]: {
      count: number;
      version: string;
    };
  }
}

export const DatabaseContext = createContext({});

export const useDatabase = (): DatabaseDirectoryProps => useContext(DatabaseContext);

interface DatabaseDirectoryProps {
  [key: string]: any;
}

export const DatabaseProvider: FunctionComponent<DatabaseProviderProps> = ({ children }) => {
  const [ provisioned, setProvisioned ] = useState(false);
  const [ libraries, setLibraries ] = useState<string[]>([]);
  const [ databases, setDatabases ] = useState<DatabaseDirectoryProps>({});
  const workerRef = useRef<Worker>();
  const { enqueueSnackbar } = useSnackbar();
  const { track } = useAnalytics();

  useEffect(() => {
    if (!provisioned) {
      workerRef.current = new Worker(new URL('../workers/indexeddb.worker', import.meta.url));
      workerRef.current.postMessage('provision');
      workerRef.current.onmessage = (event) => {
        const { error, libraries, status, task } = event.data;
        
        if (status === 'error' && error) {
          enqueueSnackbar('Fatal Error: Unable to provision library databases.', { variant: 'error' });
          track('provisionDatabaseError');
          console.error('Error Provisioning Databases', error);
          return workerRef?.current?.terminate();
        }

        if (task === 'provision' && status === 'complete') {
          setLibraries(libraries);
          setProvisioned(true);
          return workerRef?.current?.terminate();
        }
      };

      return () => workerRef?.current?.terminate();
    }
  }, [ enqueueSnackbar, provisioned, track ]);

  useEffect(() => {
    const openDatabases = async () => {
      const dbConnections = await libraries.reduce(async (prevPromise: Promise<DatabaseDirectoryProps>, libraryId: string) => {
        const output = await prevPromise;
        
        const db = new Dexie(`pg-icons-${libraryId}`);

        // Set the version
        const { default: allLibraries } = await import('../public/libraries/libraries.json') as ImportPaths;
        const { count } = allLibraries[libraryId];

        // Open the database
        db.version(count).stores({
          icons: '&n, v, a, *t, *st',
          tags: '&id, &name, &slug'
        });

        output[libraryId] = db;
        return output;
      }, Promise.resolve({}));
      setDatabases(dbConnections);
    };
    openDatabases();
  }, [ libraries ]);

  return <DatabaseContext.Provider value={databases}>{children}</DatabaseContext.Provider>;
};
