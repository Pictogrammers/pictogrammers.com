import { FunctionComponent, createContext, useContext, useEffect, useRef, useState } from 'react';
import Dexie from 'dexie';

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

  useEffect(() => {
    if (!provisioned) {
      workerRef.current = new Worker(new URL('../workers/indexeddb.worker', import.meta.url));
      workerRef.current.postMessage('provision');
      workerRef.current.onmessage = (event) => {
        const { libraries, status, task } = event.data;
        if (task === 'provision' && status === 'complete') {
          setLibraries(libraries);
          setProvisioned(true);
          workerRef?.current?.terminate();
        }
      };

      return () => {
        workerRef?.current?.terminate();
      };
    }
  }, [ provisioned ]);

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
