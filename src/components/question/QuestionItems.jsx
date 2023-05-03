/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import styled from "styled-components";
import PropTypes, { string } from "prop-types";
import parse from "html-react-parser";
import Button from "../styled/Button";

const QuestionContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  margin: auto;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;

const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0 20px 0;
`;

const AnswerCheckbox = styled.input.attrs({ type: "radio" })`
  appearance: none;

  & + span {
    display: block;
    width: 100%;
    border: 1px solid #11111f;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  &:hover + span {
    background-color: #f0a967;
  }

  &:checked + span {
    background-color: #f0a967;
  }

  &:checked + span.incorrect {
    background-color: rgba(255, 100, 100, 0.3);
  }
`;

const AnswerLabel = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonFinished = styled(Button)`
  margin: 0 0 0 auto;
  transition: box-shadow 0.1s ease-in-out;

  &:hover {
    box-shadow: 5px 5px 0 black;
  }

  &:active {
    box-shadow: 0 0 0 transparent;
  }
`;

const QuestionItems = ({
  nomor,
  question,
  correct_answer,
  choices,
  onAnswerOptionHandler,
  onFinishedHandler,
}) => {
  const answerOptions = choices.sort(() => Math.random() * 0.5);
  return (
    <QuestionContainer>
      <p>
        {nomor}. {parse(question)}
      </p>
      {answerOptions.map((answerOption) => (
        <AnswerContainer key={answerOption}>
          <AnswerLabel>
            <AnswerCheckbox
              name="answer"
              value={answerOption}
              onChange={(e) =>
                onAnswerOptionHandler(e.target.value, correct_answer)
              }
            />
            <span>{parse(answerOption)}</span>
          </AnswerLabel>
        </AnswerContainer>
      ))}
      {nomor === 10 && (
        <ButtonFinished onClick={onFinishedHandler}>Selesai</ButtonFinished>
      )}
    </QuestionContainer>
  );
};

QuestionItems.propTypes = {
  nomor: PropTypes.number,
  question: PropTypes.string,
  correct_answer: PropTypes.string,
  choices: PropTypes.arrayOf(string),
  onAnswerOptionHandler: PropTypes.func,
  onFinishedHandler: PropTypes.func,
};

export default QuestionItems;
