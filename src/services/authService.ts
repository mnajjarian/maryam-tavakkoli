import { Dispatch } from "react";
import { customAxios, setAuthToken } from "./customAxios";
import { AuthAction, AuthState } from "../reducers/authReducer";

export const useAuthService = (
  state: AuthState,
  dispatch: Dispatch<AuthAction>
) => {
  const signin = (credentials: any) => {
    customAxios
      .post("/login", credentials, { withCredentials: true })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.name);
        localStorage.setItem("userId", res.data.id)
        setAuthToken(res.data.token);
        console.log(res.data);
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
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT_USER"
    });
  };
  return {
    signin,
    logout
  };
};
