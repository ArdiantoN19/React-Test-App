import api from "../../utils/api";

const ActionType = {
  RECEIVE_HISTORY: "RECEIVE_HISTORY",
  ADD_HISTORY: "ADD_HISTORY",
};

const receiveHistoriesActionCreator = (datas) => {
  return {
    type: ActionType.RECEIVE_HISTORY,
    payload: {
      datas,
    },
  };
};

const addHistoryActionCreator = (data) => {
  return {
    type: ActionType.ADD_HISTORY,
    payload: {
      data,
    },
  };
};

const receiveHistories = () => {
  return (dispatch) => {
    const datas = api.getHistoryTest();
    dispatch(receiveHistoriesActionCreator(datas));
  };
};

const addHistory = (data) => {
  return (dispatch) => {
    const id = `test-${+new Date()}`;
    const createdAt = new Date().toISOString();
    const newData = {
      id,
      createdAt,
      ...data,
    };
    api.addhistoryTests(newData);
    dispatch(addHistoryActionCreator(newData));
  };
};

export { ActionType, receiveHistories, addHistory };
