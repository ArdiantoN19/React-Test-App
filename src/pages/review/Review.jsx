import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BiArrowBack, BiCheck } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import parser from "html-react-parser";
import { getDetailHistoryById } from "../../states/historyDetail/action";
import Loading from "../../components/loading/Loading";
import ReviewHeader from "../../components/review/ReviewHeader";
import { generateColorByScore, generateFeedback } from "../../utils";

const Navigation = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 25px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff;
`;

const BackTo = styled(Link)`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 3px;
  border-radius: 5px;
  border: 1px solid #11111f;
  transition: box-shadow 0.1s ease-in-out;

  &:hover {
    box-shadow: 5px 5px 0 black;
  }

  &:active {
    box-shadow: 0 0 0 transparent;
  }
`;

const ReviewContainer = styled.div`
  width: 100%;
  margin-top: 55px;

  @media screen and (min-width: 1000px) {
    display: flex;
    justify-content: space-between;
  }
`;

const ReviewBody = styled.div`
  width: calc(100% - 31%);
  height: 90vh;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 30px;
  overflow: auto;
`;

const QuestionList = styled.div`
  width: 100%;
  margin: 10px 0;
`;

const QuestionItem = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const QuestionItemText = styled.p`
  margin-bottom: 10px;
`;

const QuestionItemOptionContainer = styled.ul`
  list-style-type: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 10px;
`;

const QuestionItemOption = styled.li`
  width: 100%;
  padding: 10px;
  border: 1px solid #11111f;
  border-radius: 5px;
  background-color: ${(props) => props.isCorrect};
`;

const BoxCorrectContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;

  .box {
    width: 40px;
    height: 40px;
    background-color: ${(props) => props.backgroundColor};
    border: 1px solid ${(props) => props.borderColor};
    border-radius: 5px;
    display: grid;
    place-items: center;
  }
`;

const GenerateChoices = (choice, data, historyDetail, index) => {
  const { correct_answer } = data;
  if (
    choice === correct_answer &&
    historyDetail?.answers[index]?.answer === correct_answer
  ) {
    return (
      <QuestionItemOption key={choice} isCorrect="#90C8AC">
        {parser(choice)}
      </QuestionItemOption>
    );
  }
  if (historyDetail?.answers[index]?.answer === choice) {
    return (
      <QuestionItemOption key={choice} isCorrect="rgba(255,100,100,0.8)">
        {parser(choice)}
      </QuestionItemOption>
    );
  }
  return <QuestionItemOption key={choice}>{parser(choice)}</QuestionItemOption>;
};

const Review = () => {
  const { id } = useParams();
  const { historyDetail = null } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getDetailHistoryById(id));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [id, dispatch]);

  //   const { answer, category, createdAt, dataQuestions, score } = historyDetail;
  //   const totalQuestions = dataQuestions.length;

  if (historyDetail === null) {
    return <h1>Not Found Page</h1>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navigation>
        <BackTo to="/">
          <BiArrowBack size="1.5em" />
        </BackTo>
        <h3>HASIL TEST</h3>
      </Navigation>
      <ReviewContainer>
        <ReviewHeader
          {...historyDetail}
          generateColorByScore={generateColorByScore}
          generateFeedback={generateFeedback}
        />
        <ReviewBody>
          <h3>Kategori : {historyDetail.category}</h3>
          <QuestionList>
            {historyDetail.dataQuestions.map((data, index) => (
              <QuestionItem key={data.question}>
                <QuestionItemText>
                  {index + 1}. {parser(data.question)}
                </QuestionItemText>
                <QuestionItemOptionContainer>
                  {data.choices.map((choice) => {
                    return GenerateChoices(choice, data, historyDetail, index);
                  })}
                </QuestionItemOptionContainer>
                {historyDetail?.answers[index]?.isCorrect ? (
                  <BoxCorrectContainer
                    backgroundColor="#90C8AC3B"
                    borderColor="#90C8AC"
                  >
                    <div className="box">
                      <BiCheck size="1.5em" color="#90C8AC" />
                    </div>
                    <h4>Benar</h4>
                  </BoxCorrectContainer>
                ) : (
                  <BoxCorrectContainer
                    backgroundColor="rgba(255,100,100,0.2)"
                    borderColor="rgba(255,100,100)"
                  >
                    <div className="box">
                      <RxCross1 size="1.1em" color="rgba(255,100,100)" />
                    </div>
                    <h4>Salah</h4>
                  </BoxCorrectContainer>
                )}
              </QuestionItem>
            ))}
          </QuestionList>
        </ReviewBody>
      </ReviewContainer>
    </>
  );
};

export default Review;
