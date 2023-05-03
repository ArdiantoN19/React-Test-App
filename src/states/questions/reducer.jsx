import { ActionType } from "./action";

const questionsReducer = (questions = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_QUESTIONS:
      return action.payload.questions;
    default:
      return questions;
  }
};

export default questionsReducer;
