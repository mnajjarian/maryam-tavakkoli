import { Dispatch } from 'react'
import { customAxios } from './customAxios'
import { AuthAction } from '../reducers/authReducer'

type Cred = {
  firstName: string
  lastName: string
  username: string
  password: string
}

export class AuthService {
  private dispatch: Dispatch<AuthAction>
  constructor(authDispatch: Dispatch<AuthAction>) {
    this.dispatch = authDispatch
  }
  signup = (cred: Cred): void => {
    customAxios
      .post('/signup', cred)
      .then(res => {
        this.dispatch({
          type: 'SIGNIN_SUCCESS',
          payload: res.data,
        })
      })
      .catch((err: Error) => {
        this.dispatch({
          type: 'SET_ERRORS',
          payload: err.message,
        })
      })
  }
  signin = (cred: Pick<Cred, 'username' | 'password'>): void => {
    customAxios
      .post('/login', cred)
      .then(res => {
        this.dispatch({
          type: 'SIGNIN_SUCCESS',
          payload: res.data,
        })
      })
      .catch((err: Error) => {
        this.dispatch({
          type: 'SET_ERRORS',
          payload: err.message,
        })
      })
  }
  logout = (): void => {
    customAxios
      .get('/logout')
      .then(() => {
        this.dispatch({
          type: 'LOGOUT_USER',
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  authenticate = (): void => {
    customAxios
      .get('/auth')
      .then(response => {
        this.dispatch({
          type: 'SET_AUTH',
          payload: response.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
