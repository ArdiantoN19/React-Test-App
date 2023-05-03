/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import QuestionItems from "../../components/question/QuestionItems";
import { asyncReceiveQuestions } from "../../states/questions/action";
import { addHistory } from "../../states/history/action";
import ScoreQuestion from "../../components/question/ScoreQuestion";
import { generateNameCategory } from "../../utils/categories";
import CountdownTimer from "../../components/countdown/CountdownTimer";
import useCountdown from "../../hooks/useCountdown";
import Loading from "../../components/loading/Loading";

const QuestionContainer = styled.div`
  height: 100vh;
  width: 100%;
  margin-top: 8vh;

  @media screen and (min-width: 600px) {
    margin-top: 9vh;
  }

  @media screen and (min-width: 1000px) {
    display: flex;
    align-items: start;
    justify-content: center;
    margin-top: 8vh;
    gap: 15px;
  }
`;

const Navigation = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 25px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);

  h3 {
    display: none;
  }

  @media screen and (min-width: 1000px) {
    width: 30%;
    display: block;
    height: 89vh;
    align-items: start;

    h3 {
      display: block;
      margin-bottom: 20px;
    }
  }
`;

const NumberQuestionContainer = styled.div`
  display: flex;
  max-height: 10vh;
  overflow: auto;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  gap: 10px;
  width: 300px;

  @media screen and (min-width: 600px) {
    width: auto;
    max-height: 100%;
  }
`;

const NumberQuestion = styled.span`
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #11111f;
  border-radius: 5px;
  width: 32px;
  height: 32px;

  &.fill {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media screen and (min-width: 1000px) {
    width: 40px;
    height: 40px;
  }
`;

const QuestionItemsContainer = styled.div`
  width: 100%;
  max-height: 89vh;
`;

const Question = () => {
  const { id } = useParams();
  const { questions = [], authUser = "" } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(asyncReceiveQuestions(Number(id)));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [id, dispatch]);

  const dataQuestions = questions.map((question) => {
    return {
      ...question,
      choices: [...question.incorrect_answers, question.correct_answer],
    };
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const [lifetimeQuestionsMs, setLifetimeQuestionsMs] = useState(5 * 60 * 1000);
  const [, minutes, seconds] = useCountdown(lifetimeQuestionsMs);

  const onAnswerOptionHandler = (value, answerCorrect) => {
    const isCorrect = value === answerCorrect;
    setAnswers((prev) => [...prev, { answer: value, isCorrect }]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion < questions.length - 1) {
      return setCurrentQuestion((prev) => prev + 1);
    }
  };

  const onFinishedHandler = () => {
    const category = generateNameCategory(Number(id));
    const data = {
      answers,
      dataQuestions,
      authUser,
      score,
      category,
    };
    setShowScore(true);
    setLifetimeQuestionsMs(0);
    return dispatch(addHistory(data));
  };

  useEffect(() => {
    if (seconds < 1) {
      return onFinishedHandler();
    }
  }, []);

  const onRestartQuestionsHandler = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowScore(false);
    setScore(0);
    navigate("/");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!questions.length) {
    return <h1>Not Found Page</h1>;
  }

  if (showScore) {
    return (
      <ScoreQuestion
        score={score}
        totalAnswer={answers.length}
        questionsLength={questions.length}
        onRestartQuestionsHandler={onRestartQuestionsHandler}
      />
    );
  }

  return (
    <QuestionContainer>
      <Navigation>
        <h3>Kategori: {generateNameCategory(Number(id))}</h3>
        <CountdownTimer minutes={minutes} seconds={seconds} />
      </Navigation>
      <Header>
        <h3>Jumlah soal:</h3>
        <NumberQuestionContainer>
          {dataQuestions.map((_question, index) => (
            <NumberQuestion
              key={index}
              className={answers[index] ? "fill" : ""}
            >
              {index + 1}
            </NumberQuestion>
          ))}
        </NumberQuestionContainer>
      </Header>
      <QuestionItemsContainer>
        <QuestionItems
          nomor={currentQuestion + 1}
          {...dataQuestions[currentQuestion]}
          onAnswerOptionHandler={onAnswerOptionHandler}
          onFinishedHandler={onFinishedHandler}
        />
      </QuestionItemsContainer>
    </QuestionContainer>
  );
};

export default Question;
