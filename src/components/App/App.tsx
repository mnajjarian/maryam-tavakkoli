import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { DataContext } from '../../contexts/dataContext'
import { Routes } from '../Routes/Routes'
import { DataServices } from '../../services/dataService'
import { AuthService } from '../../services/authService'
import { CheckRequest } from 'components/CheckRequest/CheckRequest'

function App(): JSX.Element {
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
    <CheckRequest>
      <Routes />
    </CheckRequest>
  )
}

export default App
