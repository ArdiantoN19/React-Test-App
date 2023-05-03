import api from "../../utils/api";
import { setAuthUserActionCreator } from "../user/action";

const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

const isPreloadActionCreator = (isPreload) => {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
};

const asyncPreloadProcess = () => {
  return async (dispatch) => {
    const authName = api.getAccessUser();
    if (authName !== "") {
      dispatch(isPreloadActionCreator(false));
      return dispatch(setAuthUserActionCreator(authName));
    }
    dispatch(isPreloadActionCreator(false));
    return dispatch(setAuthUserActionCreator(""));
  };
};

export { ActionType, asyncPreloadProcess };
