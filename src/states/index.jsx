import { configureStore } from "@reduxjs/toolkit";
import thunk from "./middleware";
import authUserReducer from "./user/reducer";
import isPreloadReducer from "./isPreload/reducer";
import questionsReducer from "./questions/reducer";
import historiesReducer from "./history/reducer";
import historyDetailReducer from "./historyDetail/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    questions: questionsReducer,
    histories: historiesReducer,
    historyDetail: historyDetailReducer,
  },
  middleware: [thunk],
});

export default store;
