export interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    user: string | null;
    error: string | null;
}
export const initialAuthState: AuthState = {
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('token') !== undefined,
    error: null
}

export type AuthAction = 
| { type: 'SIGNIN_SUCCESS', payload: string}
| { type: 'SIGNIN_ERROR', payload: string}
| { type: 'SIGNUP_ERROR', payload: string}
| { type: 'SET_ERRORS', payload: string }
| { type: 'SET_USER', payload: string }



export const authReducer = (state: AuthState, action: AuthAction) => {
    console.log(action)
    switch (action.type) {
        case 'SIGNIN_ERROR':
        case 'SIGNUP_ERROR':
            return {...state, error: action.payload}
        case 'SIGNIN_SUCCESS':
            return { ...state, user: action.payload, isLoggedIn: true, error: null }
        default:
            return state;
    }
}