export interface AuthState {
  isLoggedIn: boolean
  id?: string | null
  error?: string | null
}
export const initialAuthState: AuthState = {
  isLoggedIn: window.localStorage.getItem('isAuthenticated') === 'true',
}

export type AuthAction =
  | { type: 'SIGNIN_SUCCESS'; payload: { name: string; id: string; token: string } }
  | { type: 'SIGNIN_ERROR'; payload: string }
  | { type: 'SIGNUP_ERROR'; payload: string }
  | { type: 'SET_ERRORS'; payload: string }
  | { type: 'SET_USER'; payload: string }
  | { type: 'SET_AUTH'; payload: { auth: boolean } }
  | { type: 'LOGOUT_USER' }

export const authReducer = (state: AuthState = initialAuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGNIN_ERROR':
    case 'SIGNUP_ERROR':
      return { ...state, error: action.payload }
    case 'SIGNIN_SUCCESS':
      window.localStorage.setItem('isAuthenticated', 'true')
      return {
        ...state,
        id: action.payload.id,
        isLoggedIn: true,
        error: null,
      }
    case 'LOGOUT_USER':
      window.localStorage.removeItem('isAuthenticated')
      return { ...state, isLoggedIn: false, error: null }

    case 'SET_AUTH':
      window.localStorage.setItem('isAuthenticated', action.payload.auth + '')
      return { ...state, isLoggedIn: action.payload.auth }
    default:
      return state
  }
}
