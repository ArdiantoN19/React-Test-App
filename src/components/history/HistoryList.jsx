/* eslint-disable react/forbid-prop-types */
import PropTypes, { object } from "prop-types";
import styled from "styled-components";
import HistoryItems from "./HistoryItems";

const HistoryListContainer = styled.div`
  width: 100%;
  max-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 15px;
  flex-wrap: wrap;
  padding: 10px 0;
  overflow: auto;
`;

const HistoryList = ({ histories }) => {
  if (!histories.length) {
    return <p>Tidak ada riwayat soal</p>;
  }
  return (
    <HistoryListContainer>
      {histories.map((history) => (
        <HistoryItems key={history.id} {...history} />
      ))}
    </HistoryListContainer>
  );
};

HistoryList.propTypes = {
  histories: PropTypes.arrayOf(object).isRequired,
};

export default HistoryList;
