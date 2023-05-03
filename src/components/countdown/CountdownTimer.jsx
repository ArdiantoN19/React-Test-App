import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Badge from "../styled/Badge";

const TimeDisplayContainer = styled(Badge)`
  border: 1px solid #11111f;
  background-color: ${(props) => {
    return props.isDanger ? "rgba(255,100,100,0.5)" : "transparent";
  }};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;

const CountdownTimer = ({ minutes, seconds }) => {
  return (
    <TimeDisplayContainer isDanger={seconds < 30 && minutes < 1}>
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </TimeDisplayContainer>
  );
};

CountdownTimer.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default CountdownTimer;
