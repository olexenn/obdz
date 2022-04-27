import {
  AuthActionEnum,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetTokenAction,
  SetRoleAction,
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

  setRole: (payload: string): SetRoleAction => ({
    type: AuthActionEnum.SET_ROLE,
    payload: payload,
  }),
};

export default AuthActionCreators;
