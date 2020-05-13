import React, { ReactNode, createContext, useReducer, Dispatch } from 'react'
import { authReducer, initialAuthState, AuthAction, AuthState } from '../reducers/authReducer'

interface ContextType {
  authState: AuthState
  authDispatch: Dispatch<AuthAction>
}
export const AuthContext = createContext({} as ContextType)

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState)

  const values = {
    authState,
    authDispatch,
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
