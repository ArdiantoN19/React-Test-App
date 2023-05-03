import { ActionType } from "./action";

const historyDetailReducer = (historyDetail = null, action = {}) => {
  switch (action.type) {
    case ActionType.GET_DETAIL_HISTORY:
      return action.payload.data;
    default:
      return historyDetail;
  }
};

export default historyDetailReducer;
