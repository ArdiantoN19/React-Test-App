/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Button from "../styled/Button";
import useInputs from "../../hooks/useInputs";

const InputGroup = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 15px;

  input {
    position: relative;
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #939a9a;
    border-radius: 5px;
    background-color: transparent;
    outline: none;
  }

  .icon {
    position: absolute;
    top: 2px;
    right: 0;
  }

  .invalid {
    display: block;
    color: #eb455f;
    font-size: 0.7em;
    padding: 5px 0;
  }

  label {
    font-size: 1em;
    position: absolute;
    top: 5px;
    left: 6px;
    color: #939a9a;
    transition: all 0.3s ease-in-out;
    padding: 3px;
  }

  input::placeholder {
    opacity: 0;
  }

  input:focus,
  input:not(:placeholder-shown) {
    border: 1px solid #f0a967;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    font-size: 0.8em;
    top: -13px;
    background-color: #ebf3f3;
    color: #f0a967;
  }
`;

const ButtonLogin = styled(Button)`
  display: block;
  margin-left: auto;
  transition: box-shadow 0.1s ease-in-out;

  &:hover {
    box-shadow: 5px 5px 0 black;
  }
  &:active {
    box-shadow: 0 0 0 transparent;
  }
`;

const FormInputLogin = ({ login }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, errorFormData, onChangeFormDataHandler] = useInputs();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    return login(formData);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <InputGroup>
        <input
          type="email"
          id="email"
          placeholder="type"
          name="email"
          value={formData.email || ""}
          onChange={onChangeFormDataHandler}
          required
        />
        <label htmlFor="email">Email</label>
        <span className="invalid">
          {!formData.email ? errorFormData.email : ""}
        </span>
      </InputGroup>
      <InputGroup>
        <input
          type={isShowPassword ? "text" : "password"}
          id="password"
          placeholder="type"
          name="password"
          value={formData.password || ""}
          onChange={onChangeFormDataHandler}
          required
        />
        <label htmlFor="password">Password</label>
        <span className="invalid">
          {!formData.password ? errorFormData.password : ""}
        </span>
        <Button
          type="button"
          className="icon"
          border="none"
          color="#939a9a"
          onClick={() => setIsShowPassword((prev) => !prev)}
        >
          {isShowPassword ? (
            <AiOutlineEyeInvisible size="1.3em" />
          ) : (
            <AiOutlineEye size="1.3em" />
          )}
        </Button>
      </InputGroup>
      <ButtonLogin
        type="submit"
        padding="8px 12px"
        background="#f0a967"
        border="none"
      >
        Sign In
      </ButtonLogin>
    </form>
  );
};

FormInputLogin.propTypes = {
  login: PropTypes.func.isRequired,
};

export default FormInputLogin;
