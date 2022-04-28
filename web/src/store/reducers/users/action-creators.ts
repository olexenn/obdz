import { IUser } from "../../../api/UserApi";
import {
  AddUserAction,
  RemoveUserAction,
  SetUsersAction,
  UpdateUserAction,
  UserActionEnum,
} from "./types";

const UserActionCreators = {
  setUsers: (payload: IUser[]): SetUsersAction => ({
    type: UserActionEnum.SET_USERS,
    payload: payload,
  }),

  addUser: (payload: IUser): AddUserAction => ({
    type: UserActionEnum.ADD_USER,
    payload: payload,
  }),

  removeUser: (payload: IUser): RemoveUserAction => ({
    type: UserActionEnum.REMOVE_USER,
    payload: payload,
  }),

  updateUser: (payload: IUser): UpdateUserAction => ({
    type: UserActionEnum.UPDATE_USER,
    payload: payload,
  }),
};

export default UserActionCreators;
