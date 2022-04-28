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
    case UserActionEnum.REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      };
    case UserActionEnum.UPDATE_USER: {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );

      const newArray = [...state.users];
      newArray[index] = action.payload;

      return {
        ...state,
        users: newArray,
      };
    }
    default:
      return state;
  }
}

export default UserReducer;
