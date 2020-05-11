import React, { useContext, useEffect, Suspense } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { DataContext } from '../../contexts/dataContext'
import { Routes } from '../Routes/Routes'

export function App(): JSX.Element {
  const { authService } = useContext(AuthContext)
  const { dataService } = useContext(DataContext)

  const fetchData = (): void => {
    authService.authenticate()
    dataService.getPosts()
    dataService.getGallery()
    dataService.getUsers()
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Suspense fallback={<div></div>}>
      <Routes />
    </Suspense>
  )
}
