export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: string | null;
  id: string | null;
  error: string | null;
}
export const initialAuthState: AuthState = {
  user: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") !== null,
  id: localStorage.getItem("userId"),
  error: null
};

export type AuthAction =
  | { type: "SIGNIN_SUCCESS"; payload: { firstName: string, lastName: string; _id: string, token: string } }
  | { type: "SIGNIN_ERROR"; payload: string }
  | { type: "SIGNUP_ERROR"; payload: string }
  | { type: "SET_ERRORS"; payload: string }
  | { type: "SET_USER"; payload: string }
  | { type: "LOGOUT_USER" };

export const authReducer = (state: AuthState, action: AuthAction) => {
  console.log(action);
  switch (action.type) {
    case "SIGNIN_ERROR":
    case "SIGNUP_ERROR":
      return { ...state, error: action.payload };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        user: action.payload.firstName + ' ' + action.payload.lastName,
        id: action.payload._id,
        token: action.payload.token,
        isLoggedIn: true,
        error: null
      };
    case "LOGOUT_USER":
      return { ...state, isLoggedIn: false, error: null };
    default:
      return state;
  }
};
