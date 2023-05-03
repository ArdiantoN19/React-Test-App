import PropTypes from "prop-types";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import Button from "../styled/Button";

const Styled = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const Score = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid #11111f;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.backgroundColor || "rgba(255,100,100,0.3)"};

  p {
    text-transform: uppercase;
    span {
      display: block;
      text-align: center;
      font-weight: 800;
    }
  }
`;

const BackTo = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ScoreQuestion = ({
  score,
  questionsLength,
  totalAnswer,
  onRestartQuestionsHandler,
}) => {
  return (
    <Styled>
      <h1>TOTAL</h1>
      <ScoreContainer>
        <Score backgroundColor="#90C8AC">
          <p>
            benar<span>{score}</span>
          </p>
        </Score>
        <Score>
          <p>
            salah<span>{questionsLength - score}</span>
          </p>
        </Score>
        <Score backgroundColor="#ddd">
          <p>
            jawab<span>{totalAnswer}</span>
          </p>
        </Score>
      </ScoreContainer>
      <BackTo onClick={onRestartQuestionsHandler}>
        <BiArrowBack size="1.1em" />
        Kembali
      </BackTo>
    </Styled>
  );
};

ScoreQuestion.propTypes = {
  score: PropTypes.number.isRequired,
  totalAnswer: PropTypes.number.isRequired,
  questionsLength: PropTypes.number.isRequired,
  onRestartQuestionsHandler: PropTypes.func.isRequired,
};

export default ScoreQuestion;
