export interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  token: string;
  role: string;
}

export enum AuthActionEnum {
  SET_AUTH = "SET_AUTH",
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_TOKEN = "SET_TOKEN",
  SET_ROLE = "SET_ROLE",
}

export interface SetAuthAction {
  type: AuthActionEnum.SET_AUTH;
  payload: boolean;
}

export interface SetIsLoadingAction {
  type: AuthActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: AuthActionEnum.SET_ERROR;
  payload: string;
}

export interface SetTokenAction {
  type: AuthActionEnum.SET_TOKEN;
  payload: string;
}

export interface SetRoleAction {
  type: AuthActionEnum.SET_ROLE;
  payload: string;
}

export type AuthAction =
  | SetAuthAction
  | SetIsLoadingAction
  | SetErrorAction
  | SetTokenAction
  | SetRoleAction;
