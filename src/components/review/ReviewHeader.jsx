/* eslint-disable react/forbid-prop-types */
import PropTypes, { object } from "prop-types";
import styled from "styled-components";
import showFormattedDate from "../../utils/formattedDate";

const ReviewHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 20px;
  border: none;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);

  h3 {
    color: #f0a967;
    text-shadow: 0 0px 1px rgba(0, 0, 0, 0.1);
  }

  @media screen and (min-width: 1000px) {
    width: calc(100% - 70%);
    height: 90vh;
  }
`;

const ReviewDate = styled.div`
  font-size: 1.2em;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 30px;
  margin-bottom: 20px;
`;

const ScoreContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #939a9a;
  padding-bottom: 30px;
`;

const Score = styled.div`
  width: auto;
  height: auto;
  font-weight: bold;
`;

const ScoreText = styled.p`
  font-size: 4em;
  text-align: center;
  color: ${(props) => props.color};
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const TotalScore = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #939a9a;
  padding-bottom: 30px;
`;

const Feedback = styled.p`
  font-size: 1.2em;
  text-align: center;
  padding: 15px 20px;
`;

const ReviewHeader = ({
  createdAt,
  score,
  dataQuestions,
  generateColorByScore,
  generateFeedback,
}) => {
  return (
    <ReviewHeaderContainer>
      <ReviewDate>
        <h3>Tanggal Test: </h3>
        {showFormattedDate(createdAt)}
      </ReviewDate>
      <ScoreContainer>
        <Score>
          JAWABAN BENAR<ScoreText>{score}</ScoreText>
        </Score>
        <Score>
          TOTAL SOAL
          <ScoreText>{dataQuestions.length}</ScoreText>
        </Score>
      </ScoreContainer>
      <TotalScore>
        <Score>
          SCORE
          <ScoreText color={generateColorByScore(score)}>
            {score * 10}
          </ScoreText>
        </Score>
      </TotalScore>
      <Feedback>{generateFeedback(score)}</Feedback>
    </ReviewHeaderContainer>
  );
};

ReviewHeader.propTypes = {
  createdAt: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dataQuestions: PropTypes.arrayOf(object).isRequired,
  generateColorByScore: PropTypes.func.isRequired,
  generateFeedback: PropTypes.func.isRequired,
};

export default ReviewHeader;
