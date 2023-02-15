import { FunctionComponent, MouseEvent, createContext, useContext, useEffect, useState } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useAnalytics } from 'use-analytics';
import Cookies from 'js-cookie';

interface AuthProviderProps {
  children: any;
}

interface AuthProps {
  [key: string]: any;
}

export const AuthContext = createContext({});

export const useAuth = (): AuthProps => useContext(AuthContext);

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ authData, setAuthData ] = useState<AuthProps | null>(null);
  const [ lastError, setLastError ] = useState<string | null>(null);
  const { publicRuntimeConfig: { apiBase, sessionCookieName } } = getConfig();
  const { enqueueSnackbar } = useSnackbar();
  const { track } = useAnalytics();
  const router = useRouter();

  const sessionCookie = Cookies.get(sessionCookieName);

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
        setAuthData({
          ...data,
          isLoggedIn: !!sessionCookie
        });
        setLoading(false);
      }
    };

    if (sessionCookie && !authData) {
      getSessionData();
    } else if (!sessionCookie) {
      setLoading(false);
    }
  }, [ authData, apiBase, sessionCookie ]);

  const logout = async (event: MouseEvent) => {
    event.preventDefault();

    try {
      await router.push('/');
      await fetch(`${apiBase}/auth/logout`, { credentials: 'include', mode: 'cors' });
      Cookies.remove(sessionCookieName);
      setAuthData(null);
      setLastError(null);
    } catch (error) {
      enqueueSnackbar('Fatal Error: Unable to log you out.', { variant: 'error' });
      track('logoutError');
      console.error('Unable to end session.', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authData,
        error: lastError,
        loading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
