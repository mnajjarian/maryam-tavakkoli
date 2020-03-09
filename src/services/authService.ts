import { Dispatch } from "react";
import { customAxios } from "./customAxios";
import { AuthAction, AuthState } from "../reducers/authReducer";

export const useAuthService = (
  state: AuthState,
  dispatch: Dispatch<AuthAction>
) => {
  const signup = (credentials: any) => {
    customAxios
      .post("/signup", credentials)
      .then(res => {
        dispatch({
          type: "SIGNIN_SUCCESS",
          payload: res.data
        });
      })
      .catch((err: Error) => {
        dispatch({
          type: "SET_ERRORS",
          payload: err.message
        });
      });
  };
  const signin = (credentials: any) => {
    customAxios
      .post("/login", credentials, { withCredentials: true })
      .then(res => {
        dispatch({
          type: "SIGNIN_SUCCESS",
          payload: res.data
        });
      })
      .catch((err: Error) => {
        dispatch({
          type: "SET_ERRORS",
          payload: err.message
        });
      });
  };
  const logout = async () => {
    customAxios
      .get("/logout")
      .then(response => {
        dispatch({
          type: "LOGOUT_USER"
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const authenticate = () => {
    customAxios.get("/auth").then(response => {
      dispatch({
        type: "SET_AUTH",
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err)
    })
  };

  return {
    signup,
    signin,
    logout,
    authenticate
  };
};
