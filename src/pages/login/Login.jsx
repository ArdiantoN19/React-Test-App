import styled from "styled-components";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../../states/user/action";
import FormInputLogin from "../../components/formLogin/FormInputLogin";

const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftColumn = styled.div`
  display: none;
  width: calc(100% - 50%);
  height: 100%;

  @media screen and (min-width: 1000px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const RightColumn = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 100%;

    h2 {
      margin-bottom: 5px;
    }

    p {
      font-size: 0.9em;
      color: #939a9a;
      margin-bottom: 25px;
    }
  }

  @media screen and (min-width: 600px) {
    width: calc(100% - 50%);
  }

  @media screen and (min-width: 1000px) {
    padding: 100px;
  }

  @media screen and (min-width: 1000px) {
    padding: 150px;
  }
`;

const Img = styled.img`
  display: block;
  width: 60%;
`;

const Login = () => {
  const dispatch = useDispatch();

  const onSubmitHandler = (login) => {
    return dispatch(asyncSetAuthUser(login));
  };

  return (
    <Row>
      <LeftColumn>
        <Img src="/many.png" alt="logo-login" />
      </LeftColumn>
      <RightColumn>
        <div>
          <h2>👋 Hello there</h2>
          <p>Please fill your data here for sign in app.</p>
          <FormInputLogin login={onSubmitHandler} />
        </div>
      </RightColumn>
    </Row>
  );
};

export default Login;
