/* eslint-disable no-restricted-globals */
import api from "../../utils/api";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

const setAuthUserActionCreator = (authUser) => {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
};

const unsetAuthUserActionCreator = () => {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: "",
    },
  };
};

const asyncSetAuthUser = (user) => {
  return async (dispatch) => {
    try {
      const { name } = await api.login(user);
      api.putAccessUser(name);
      dispatch(setAuthUserActionCreator(name));
    } catch (error) {
      const err = JSON.parse(error);
      alert(err.message);
    }
  };
};

const asyncUnsetAuthUser = () => {
  return async (dispatch) => {
    const choice = confirm("Do you want sign out for this app?");
    if (choice) {
      api.putAccessUser("");
      dispatch(unsetAuthUserActionCreator());
    }
  };
};

export {
  ActionType,
  setAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
