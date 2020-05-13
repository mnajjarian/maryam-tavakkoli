import React, { useReducer, createContext, ReactNode, Dispatch } from 'react'
import { dataReducer, initialDataState, DataAction, DataState } from '../reducers/dataReducer'

interface ContextType {
  data: DataState
  dataDispatch: Dispatch<DataAction>
}
export const DataContext = createContext({} as ContextType)

export const DataProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [data, dataDispatch] = useReducer(dataReducer, initialDataState)

  const values = {
    data,
    dataDispatch,
  }
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>
}
