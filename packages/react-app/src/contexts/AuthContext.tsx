/* eslint-disable @typescript-eslint/no-use-before-define */
import jwtDecode from "jwt-decode";
import React, { createContext, ReactNode, useEffect, useState } from "react";

import loginRequest from "../api/authentication/login";
import LocalStorage from "../services/LocalStorage";

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

  // login function
  const login = async (email: string, password: string) => {
    const { token, refreshToken: refresh } = await loginRequest(
      email,
      password
    );
    setAuth(token, refresh);
  };

  // logout function to clear local storage and local context state
  const logout = () => {
    setAccessToken("");
    setRefreshToken("");
    LocalStorage.removeItem(authStorageKey);
  };

  // function to setup auth object and store into local storage
  const setAuth = (access: string, refresh: string) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    LocalStorage.setItem(
      authStorageKey,
      JSON.stringify({ accessToken: access, refreshToken: refresh })
    );
  };

  // function for getting and setting the auth state from storage
  const getAuthFromStorage = () => {
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
        // TODO: implement refreshing
      } else {
        // if not expired set auth with the details
        setAuth(accessTokenFromStorage, refreshTokenFromStorage);
      }
    }
  };

  // set the starting auth state to whatever is stored in secure storage
  useEffect(() => {
    getAuthFromStorage();
  });

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
