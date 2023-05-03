import api from "../../utils/api";

const ActionType = {
  RECEIVE_QUESTIONS: "RECEIVE_QUESTIONS",
};

const receiveQuestionsActionCreator = (questions) => {
  return {
    type: ActionType.RECEIVE_QUESTIONS,
    payload: {
      questions,
    },
  };
};

const asyncReceiveQuestions = (id) => {
  return async (dispatch) => {
    try {
      const questions = await api.generateQuestions(id);
      dispatch(receiveQuestionsActionCreator(questions));
    } catch (error) {
      alert(error);
    }
  };
};

export { ActionType, receiveQuestionsActionCreator, asyncReceiveQuestions };
