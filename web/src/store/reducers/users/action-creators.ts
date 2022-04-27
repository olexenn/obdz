import { IUser } from "../../../api/UserApi";
import { AddUserAction, SetUsersAction, UserActionEnum } from "./types";

const UserActionCreators = {
  setUsers: (payload: IUser[]): SetUsersAction => ({
    type: UserActionEnum.SET_USERS,
    payload: payload,
  }),

  addUser: (payload: IUser): AddUserAction => ({
    type: UserActionEnum.ADD_USER,
    payload: payload,
  }),
};

export default UserActionCreators;
