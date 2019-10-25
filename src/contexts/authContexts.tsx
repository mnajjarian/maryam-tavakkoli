import React, { ReactChildren, ReactNode } from 'react';
import { authReducer, InitState } from "../reducers/authReducer";
import { createContext, useReducer } from "react";
import { useAuthService } from '../services/authService';

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, authDispatch] = useReducer(authReducer, {} as InitState);
  const authService = useAuthService(authState, authDispatch);

  const values = {
    authState,
    authDispatch,
    authService
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
