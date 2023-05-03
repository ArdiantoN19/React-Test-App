/* eslint-disable no-shadow */
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import showFormattedDate from "../../utils/formattedDate";

const HistoryItemContainer = styled.div`
  width: 160px;
  height: 160px;
  border: 1px solid #11111f;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out;

  &:hover {
    box-shadow: 5px 5px 0 black;
  }
  &:active {
    box-shadow: 0 0 0 transparent;
  }

  & > p {
    background-color: #f0a967;
    padding: 3px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 5px;
    text-transform: capitalize;
  }

  small {
    display: block;
    font-size: 0.8em;
    color: #939a9a;
    margin-bottom: 10px;
  }
`;

const HistoryItemScore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 70px;
  border-radius: 5px;
  border: 1px solid #11111f;
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;

const HistoryItems = ({ id, category, createdAt, score }) => {
  const generateBackgroundByScore = (score) => {
    if (score < 4) return "rgba(255,100,100,0.3)";
    if (score > 4 && score < 7) return "#F1F7B5";
    return "#90C8AC";
  };

  const navigate = useNavigate();

  return (
    <HistoryItemContainer onClick={() => navigate(`/review/${id}`)}>
      <p>{category}</p>
      <small>{showFormattedDate(createdAt)}</small>
      <HistoryItemScore backgroundColor={generateBackgroundByScore(score)}>
        <p>SCORE</p>
        <p>{score * 10}</p>
      </HistoryItemScore>
    </HistoryItemContainer>
  );
};

HistoryItems.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default HistoryItems;
