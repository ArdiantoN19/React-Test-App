import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../components/styled/Button";
import Modal from "../../components/modal/Modal";
import { asyncReceiveQuestions } from "../../states/questions/action";
import { receiveHistories } from "../../states/history/action";
import { categories } from "../../utils/categories";
import HistoryList from "../../components/history/HistoryList";

const H3 = styled.h3`
  width: 100%;
  color: #f0a967;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.125);
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const CategoryContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const ButtonCategory = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: box-shadow 0.1s ease-in-out;

  &:hover {
    box-shadow: 5px 5px 0 black;
  }
  &:active {
    box-shadow: 0 0 0 transparent;
  }
`;

const Home = () => {
  const { histories = [] } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [isId, setIsId] = useState(null);

  useEffect(() => {
    dispatch(receiveHistories());
  }, []);

  const generateQuestions = (id) => {
    dispatch(asyncReceiveQuestions(id));
    setIsId(id);
    setIsShow(true);
  };

  return (
    <>
      <H3>Kategori soal </H3>
      <CategoryContainer>
        {categories.map(({ id, name, icon }) => (
          <ButtonCategory key={id} onClick={() => generateQuestions(id)}>
            {icon}
            {name}
          </ButtonCategory>
        ))}
        <Modal isShow={isShow} setIsShow={setIsShow} id={isId} />
      </CategoryContainer>
      <H3>Riwayat soal</H3>
      <HistoryList histories={histories} />
    </>
  );
};

export default Home;
