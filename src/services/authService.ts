import { Dispatch } from "react";
import { customAxios, setAuthToken } from "./customAxios";
import { AuthAction, AuthState } from '../reducers/authReducer';

export const useAuthService = (state: AuthState, dispatch: Dispatch<AuthAction>) => {
  const signin = (credentials: any) => {
    customAxios
      .post('/login', credentials, { withCredentials: true })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem('user', res.data.name)
        setAuthToken(res.data.token);
        dispatch({
            type: 'SIGNIN_SUCCESS',
            payload: res.data.name
        })
      })
      .catch((err: Error) => {
          dispatch({
            type: 'SET_ERRORS',
            payload: err.message,
          });
      })
  };
  return {
    signin
  };
};
