/* eslint-disable @typescript-eslint/no-use-before-define */
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import loginRequest from "../api/authentication/login";
import refreshRequest from "../api/authentication/refresh";
import LocalStorage from "../services/LocalStorage";

// axios.defaults.baseURL = "http://localhost:3030/";
axios.defaults.baseURL = "https://winetrust.ts.r.appspot.com/";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface IAuthContext {
  loggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const INITIAL_AUTH_CONTEXT = {
  loggedIn: false,
  login: async () => {},
  logout: () => {},
};

export const AuthContext = createContext<IAuthContext>(INITIAL_AUTH_CONTEXT);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const loggedIn = accessToken !== "";

  const authStorageKey = "auth";

  // function to setup auth object and store into local storage
  const setAuth = useCallback(
    (access: string, refresh: string) => {
      setAccessToken(access);
      setRefreshToken(refresh);
      LocalStorage.setItem(
        authStorageKey,
        JSON.stringify({ accessToken: access, refreshToken: refresh })
      );
    },
    [setAccessToken, setRefreshToken]
  );

  // login function
  const login = useCallback(
    async (email: string, password: string) => {
      const { token, refreshToken: refresh } = await loginRequest(
        email,
        password
      );
      setAuth(token, refresh);
    },
    [setAuth]
  );

  // logout function to clear local storage and local context state
  const logout = useCallback(() => {
    setAccessToken("");
    setRefreshToken("");
    LocalStorage.removeItem(authStorageKey);
  }, [setAccessToken, setRefreshToken]);

  // function for getting and setting the auth state from storage
  const getAuthFromStorage = useCallback(async () => {
    // get the token object
    const authResponse = LocalStorage.getItem(authStorageKey);

    if (authResponse) {
      // check if the token from storage has expired
      const {
        accessToken: accessTokenFromStorage,
        refreshToken: refreshTokenFromStorage,
      } = JSON.parse(authResponse) as AuthResponse;
      if (!accessTokenFromStorage || accessTokenFromStorage === "") return;

      const { exp } = jwtDecode(accessTokenFromStorage) as any;

      // check if token is expired
      if (Date.now() >= exp * 1000) {
        // try to refresh token
        try {
          const response = await refreshRequest(refreshTokenFromStorage);

          const { token: newAccessToken, refreshToken: newRefreshToken } =
            response;

          setAuth(newAccessToken, newRefreshToken);
        } catch (error) {
          logout();
        }
      } else {
        // if not expired set auth with the details
        setAuth(accessTokenFromStorage, refreshTokenFromStorage);
      }
    }
  }, [logout, setAuth]);

  // set the starting auth state to whatever is stored in secure storage
  useEffect(() => {
    getAuthFromStorage();
  });

  // setup axios interceptors
  useEffect(() => {
    let requestInterceptor: number;
    let responseInterceptor: number;

    if (refreshToken) {
      responseInterceptor = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response.status === 401) {
            // try to refresh token
            let response: any;
            try {
              response = await refreshRequest(refreshToken);

              setAccessToken(response.data.token);
              setRefreshToken(response.data.refreshToken);

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

    if (accessToken) {
      requestInterceptor = axios.interceptors.request.use(
        (config) => {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${accessToken}`;
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
  }, [accessToken, logout, refreshToken]);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
