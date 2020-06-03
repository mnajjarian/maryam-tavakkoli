import React, { useContext, useEffect, Suspense } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { DataContext } from '../../contexts/dataContext'
import { Routes } from '../Routes/Routes'
import { DataServices } from 'services/dataService'
import { AuthService } from 'services/authService'

export function App(): JSX.Element {
  const { authDispatch } = useContext(AuthContext)
  const { dataDispatch } = useContext(DataContext)

  useEffect(() => {
    const dataService = new DataServices(dataDispatch)
    const authService = new AuthService(authDispatch)
    const fetchData = (): void => {
      authService.authenticate()
      dataService.getUsers()
      dataService.getPosts()
      dataService.getGallery()
    }
    fetchData()
  }, [dataDispatch, authDispatch])

  return (
    <Suspense fallback={<div></div>}>
      <Routes />
    </Suspense>
  )
}
