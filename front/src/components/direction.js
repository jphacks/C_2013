import React from "react";
import styled from "styled-components";

const message = require("./direction.json");

const Direction = () => {
  const url = window.location.pathname;
  return <StyledDiv>{message[url]}</StyledDiv>;
};

const StyledDiv = styled.div({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  position: "absolute",
  top: "570px",
  fontSize: "27px",
  fontFamily: "book",
  color: "white",
  width: "100%",
  textAlign: "center",
  height: "50px",
  lineHeight: "50px",
});

export default Direction;
