import { FunctionComponent, createContext, useContext, useEffect, useState } from 'react';
import getConfig from 'next/config';

interface AdminDataProviderProps {
  children: any;
}

interface AdminDataProps {
  [key: string]: any;
}

export const AdminDataContext = createContext({});

export const useAdminData = (): AdminDataProps => useContext(AdminDataContext);

export const AdminDataProvider: FunctionComponent<AdminDataProviderProps> = ({ children }) => {
  const [ adminData, setAdminData ] = useState<AdminDataProps>({});
  const [ lastError, setLastError ] = useState<string | null>(null);
  const { publicRuntimeConfig: { apiBase } } = getConfig();

  // TODO: Pull the cookie and check for its expiry to force a recheck of the endpoint

  useEffect(() => {
    const getSessionData = async () => {
      const response = await fetch(`${apiBase}/auth/session`, { credentials: 'include', mode: 'cors' });
      if (response.ok) {
        const data = await response.json();
        if (!data.auth && data.error) {
          setLastError(data.error);
        } else if (data.auth) {
          setLastError(null);
        }
        setAdminData(data);
      }
    };
    if (!adminData.auth) {
      getSessionData();
    }
  }, [ adminData.auth, adminData.error, apiBase ]);

  return <AdminDataContext.Provider value={{ ...adminData, error: lastError }}>{children}</AdminDataContext.Provider>;
};
