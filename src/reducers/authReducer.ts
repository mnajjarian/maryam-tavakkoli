export interface AuthState {
  isLoggedIn: boolean;
  id?: string | null;
  error?: string | null;
}
export const initialAuthState: AuthState = {
  isLoggedIn: false,
};

export type AuthAction =
  | { type: "SIGNIN_SUCCESS"; payload: { name: string; id: string, token: string } }
  | { type: "SIGNIN_ERROR"; payload: string }
  | { type: "SIGNUP_ERROR"; payload: string }
  | { type: "SET_ERRORS"; payload: string }
  | { type: "SET_USER"; payload: string }
  | { type: "SET_AUTH"; payload: { auth: boolean } }
  | { type: "LOGOUT_USER" };

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "SIGNIN_ERROR":
    case "SIGNUP_ERROR":
      return { ...state, error: action.payload };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        id: action.payload.id,
        isLoggedIn: true,
        error: null
      };
    case "LOGOUT_USER":
      return { ...state, isLoggedIn: false, error: null };

    case "SET_AUTH":
      return { ...state, isLoggedIn: action.payload.auth }
    default:
      return state;
  }
};
