import { AuthAction, AuthActionEnum, AuthState } from "./types";

const checkTok = localStorage.getItem("auth");

const initialState: AuthState = {
  isAuth: checkTok ? true : false,
  isLoading: false,
  error: "",
  token: checkTok ? checkTok : "",
};

function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionEnum.SET_AUTH:
      return { ...state, isAuth: action.payload };
    case AuthActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case AuthActionEnum.SET_ERROR:
      return { ...state, error: action.payload };
    case AuthActionEnum.SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}

export default authReducer;
