import { Dispatch } from 'react'
import { customAxios } from './customAxios'
import { AuthAction, AuthState } from '../reducers/authReducer'

type Cred = {
  username: string
  password: string
  email?: string
}
type AuthService = {
  signup: (cred: Cred) => void
  signin: (cred: Cred) => void
  logout: () => void
  authenticate: () => void
}
export const useAuthService = (state: AuthState, dispatch: Dispatch<AuthAction>): AuthService => {
  const signup = (cred: Cred): void => {
    customAxios
      .post('/signup', cred)
      .then(res => {
        dispatch({
          type: 'SIGNIN_SUCCESS',
          payload: res.data,
        })
      })
      .catch((err: Error) => {
        dispatch({
          type: 'SET_ERRORS',
          payload: err.message,
        })
      })
  }
  const signin = (cred: Cred): void => {
    customAxios
      .post('/login', cred)
      .then(res => {
        dispatch({
          type: 'SIGNIN_SUCCESS',
          payload: res.data,
        })
      })
      .catch((err: Error) => {
        dispatch({
          type: 'SET_ERRORS',
          payload: err.message,
        })
      })
  }
  const logout = (): void => {
    customAxios
      .get('/logout')
      .then(() => {
        dispatch({
          type: 'LOGOUT_USER',
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const authenticate = (): void => {
    customAxios
      .get('/auth')
      .then(response => {
        dispatch({
          type: 'SET_AUTH',
          payload: response.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  return {
    signup,
    signin,
    logout,
    authenticate,
  }
}
