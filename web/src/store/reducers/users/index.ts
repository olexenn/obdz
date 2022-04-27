import { UserAction, UserActionEnum, UserState } from "./types";

const initialState: UserState = {
  users: [],
};

function UserReducer(state = initialState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionEnum.SET_USERS:
      return { ...state, users: action.payload };
    case UserActionEnum.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
}

export default UserReducer;
