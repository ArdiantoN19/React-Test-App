import styled, { keyframes } from "styled-components";

const fade = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 50%;
    }
    100% {
        opacity: 1;
    }
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingTitle = styled.h3`
  animation: ${fade} 1s infinite ease-in-out;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingTitle>Loading...</LoadingTitle>
    </LoadingContainer>
  );
};

export default Loading;
