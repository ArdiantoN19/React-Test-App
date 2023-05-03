import { ActionType } from "./action";

const historiesReducer = (histories = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_HISTORY:
      return action.payload.datas;
    case ActionType.ADD_HISTORY:
      return [...histories, action.payload.data];
    default:
      return histories;
  }
};

export default historiesReducer;
