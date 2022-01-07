/* eslint-disable @typescript-eslint/no-use-before-define */
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import { loginRequest, signupRequest } from "../api/authentication/authenticate";
import refreshRequest from "../api/authentication/refresh";
import useLocalStorage from "../hooks/localStorage/useLocalStorage";

axios.defaults.baseURL = "http://dev.winetrust.org:3030/";
// axios.defaults.baseURL = "http://localhost:3030/";
// axios.defaults.baseURL = "https://winetrust.ts.r.appspot.com/";

interface AuthDetails {
  accessToken: string;
  refreshToken: string;
  email: string;
}

interface IAuthContext {
  loggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  authDetails: AuthDetails | undefined;
}

const INITIAL_AUTH_CONTEXT = {
  loggedIn: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  authDetails: undefined,
};

export const AuthContext = createContext<IAuthContext>(INITIAL_AUTH_CONTEXT);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const authStorageKey = "auth";

  const [authDetails, setAuthDetails] = useLocalStorage<
    AuthDetails | undefined
  >(authStorageKey, undefined);

  const loggedIn = useMemo(() => {
    if (!authDetails?.accessToken) return false;
    return true;
  }, [authDetails?.accessToken]);

  // login function
  const login = useCallback(
    async (email: string, password: string) => {
      const { token, refreshToken: refresh } = await loginRequest(
        email,
        password
      );
      setAuthDetails({ email, accessToken: token, refreshToken: refresh });
    },
    [setAuthDetails]
  );

  const signup = useCallback(
    async (email: string, password: string) => {
      const { token, refreshToken: refresh } = await signupRequest(
        email,
        password
      );
      setAuthDetails({ email, accessToken: token, refreshToken: refresh });
    },
    [setAuthDetails]
  );


  // logout function to clear local storage and local context state
  const logout = useCallback(() => {
    setAuthDetails(undefined);
  }, [setAuthDetails]);

  useEffect(() => {
    (async () => {
      if (!authDetails?.accessToken) return;

      const { exp } = jwtDecode(authDetails?.accessToken) as any;

      if (Date.now() >= exp * 1000) {
        // try to refresh token
        try {
          const { token: newAccessToken, refreshToken: newRefreshToken } =
            await refreshRequest(authDetails?.refreshToken);

          setAuthDetails({
            ...authDetails,
            refreshToken: newRefreshToken,
            accessToken: newAccessToken,
          });
        } catch (error) {
          logout();
        }
      }
    })();
  }, [authDetails, logout, setAuthDetails]);

  // setup axios interceptors
  useEffect(() => {
    let requestInterceptor: number;
    let responseInterceptor: number;

    if (authDetails?.refreshToken) {
      responseInterceptor = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response.status === 401) {
            try {
              const { token, refreshToken: refresh } = await refreshRequest(
                authDetails?.refreshToken
              );

              setAuthDetails({
                ...authDetails,
                refreshToken: refresh,
                accessToken: token,
              });

              return await axios(error.config);
            } catch (innerError) {
              logout();
            }
          }

          // just throw the error if not 401
          throw error;
        }
      );
    }

    if (authDetails?.accessToken) {
      requestInterceptor = axios.interceptors.request.use(
        (config) => {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${authDetails?.accessToken}`;
          return config;
        },
        (error) => {
          throw error;
        }
      );
    }

    return () => {
      // eject the interceptor when this useEffect runs again
      axios.interceptors.response.eject(responseInterceptor);
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [authDetails, logout, setAuthDetails]);

  return (
    <AuthContext.Provider value={{ loggedIn, login, signup, logout, authDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
