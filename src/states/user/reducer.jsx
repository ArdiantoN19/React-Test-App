import { ActionType } from "./action";

const authUserReducer = (authUser = "", action = {}) => {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload.authUser;
    case ActionType.UNSET_AUTH_USER:
      return action.payload.authUser;
    default:
      return authUser;
  }
};

export default authUserReducer;
