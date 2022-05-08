import AuthActionCreators from "./auth/action-creators";
import ExtractActionCreators from "./extracts/action-creators";
import UserActionCreators from "./users/action-creators";

export const allActionCreators = {
  ...AuthActionCreators,
  ...UserActionCreators,
  ...ExtractActionCreators,
};
