import React, { ReactNode, createContext, useReducer } from 'react';
import { authReducer, initialAuthState } from "../reducers/authReducer";
import { useAuthService } from '../services/authService';

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const authService = useAuthService(authState, authDispatch);

  const values = {
    authState,
    authDispatch,
    authService,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};
