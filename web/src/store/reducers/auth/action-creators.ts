import UserApi from "../../../api/UserApi";
import { AppDispatch } from "../../store";
import {
  AuthActionEnum,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetTokenAction,
} from "./types";

const AuthActionCreators = {
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),

  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload: payload,
  }),

  setError: (payload: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload: payload,
  }),

  setToken: (payload: string): SetTokenAction => ({
    type: AuthActionEnum.SET_TOKEN,
    payload: payload,
  }),

  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        const { data } = await UserApi.login(username, password);
        if (data) {
          localStorage.setItem("auth", data.accessToken);
          dispatch(AuthActionCreators.setIsAuth(true));
          dispatch(AuthActionCreators.setToken(data.accessToken));
          dispatch(AuthActionCreators.setIsLoading(false));
        } else {
          dispatch(AuthActionCreators.setError("Неправильний Логін чи Пароль"));
          dispatch(AuthActionCreators.setIsLoading(false));
        }
      } catch (e) {
        dispatch(AuthActionCreators.setError("Неправильний Логін чи Пароль"));
        dispatch(AuthActionCreators.setIsLoading(false));
      }
    },

  logout: () => (dispatch: AppDispatch) => {
    localStorage.removeItem("auth");
    dispatch(AuthActionCreators.setIsAuth(false));
    dispatch(AuthActionCreators.setToken(""));
  },
};

export default AuthActionCreators;
