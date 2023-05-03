import api from "../../utils/api";

const ActionType = {
  GET_DETAIL_HISTORY: "GET_DETAIL_HISTORY",
};

const getDetailHistoryActionCreator = (data) => {
  return {
    type: ActionType.GET_DETAIL_HISTORY,
    payload: {
      data,
    },
  };
};

const getDetailHistoryById = (id) => {
  return (dispatch) => {
    const detailHistory = api.getDetailHistoryById(id);
    dispatch(getDetailHistoryActionCreator(detailHistory));
  };
};

export { ActionType, getDetailHistoryById };
