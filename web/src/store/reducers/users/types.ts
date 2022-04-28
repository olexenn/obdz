import { IUser } from "../../../api/UserApi";

export interface UserState {
  users: IUser[];
}

export enum UserActionEnum {
  SET_USERS = "SET_USERS",
  ADD_USER = "ADD_USER",
  REMOVE_USER = "REMOVE_USER",
  UPDATE_USER = "UPDATE_USER",
}

export interface SetUsersAction {
  type: UserActionEnum.SET_USERS;
  payload: IUser[];
}

export interface AddUserAction {
  type: UserActionEnum.ADD_USER;
  payload: IUser;
}

export interface RemoveUserAction {
  type: UserActionEnum.REMOVE_USER;
  payload: IUser;
}

export interface UpdateUserAction {
  type: UserActionEnum.UPDATE_USER;
  payload: IUser;
}

export type UserAction =
  | SetUsersAction
  | AddUserAction
  | RemoveUserAction
  | UpdateUserAction;
