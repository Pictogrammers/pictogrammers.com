import { FunctionComponent, createContext, useContext, useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useAnalytics } from 'use-analytics';

import { ContributorProps } from '../interfaces/contributor';

interface DataProviderProps {
  children: any;
}

interface DataProps {
  [key: string]: any;
}

export const DataContext = createContext({});

export const useData = (): DataProps => useContext(DataContext);

export const DataProvider: FunctionComponent<DataProviderProps> = ({ children }) => {
  const [ initialLoad, setInitialLoad ] = useState(true);
  const [ libraries, setLibraries ] = useState({});
  const [ docs, setDocs ] = useState([]);
  const [ contributors, setContributors ] = useState<ContributorProps[]>([]);

  const workerRef = useRef<Worker>();
  const { enqueueSnackbar } = useSnackbar();
  const { track } = useAnalytics();

  useEffect(() => {
    if (!initialLoad) {
      return;
    }

    workerRef.current = new Worker(new URL('../workers/data.worker', import.meta.url));
    workerRef.current.postMessage('load');
    workerRef.current.onmessage = (event) => {
      const { data, error, status, type } = event.data;

      if (status === 'error' && error) {
        enqueueSnackbar(`Fatal Error: Unable to retrieve data for ${type}.`, { variant: 'error' });
        track(`load${type[0].toUpperCase() + type.slice(1)}Error`);
        console.error('Error Retrieving Data', type, error);
        return workerRef?.current?.terminate();
      }

      if (status === 'complete') {
        switch (type) {
          case 'libraries':
            return setLibraries(data);
          case 'docs':
            return setDocs(data);
          case 'contributors':
            return setContributors(data.contributors);
          default:
            setInitialLoad(false);
        }

        return workerRef?.current?.terminate();
      }
    };

    return () => workerRef?.current?.terminate();
  }, [ enqueueSnackbar, initialLoad, track ]);

  return <DataContext.Provider value={{ contributors, docs, libraries }}>{children}</DataContext.Provider>;
};
