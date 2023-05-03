import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BsBoxArrowLeft } from "react-icons/bs";
import Button from "../styled/Button";
import { asyncUnsetAuthUser } from "../../states/user/action";

const NavbarContainer = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1);
`;

const NavbarTitle = styled.h1`
  font-size: 1.5em;
`;

const SignOut = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-transform: capitalize;
  transition: box-shadow 0.1s ease-in-out;

  &:hover {
    box-shadow: 5px 5px 0 black;
  }
  &:active {
    box-shadow: 0 0 0 transparent;
  }
`;

const Navbar = () => {
  const { authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(asyncUnsetAuthUser());
  };
  return (
    <NavbarContainer>
      <NavbarTitle>My-Test</NavbarTitle>
      <SignOut title="Sign Out" onClick={onLogoutHandler}>
        {authUser}
        <BsBoxArrowLeft size="1.2em" />
      </SignOut>
    </NavbarContainer>
  );
};

export default Navbar;
