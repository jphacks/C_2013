import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SelectBox = ({ name, path }) => (
  <Link to={path}>
    <StyledDiv>{name}</StyledDiv>
  </Link>
);

const StyledDiv = styled.div({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  width: "300px",
  height: "300px",
  margin: "200px 100px 0 100px",
  display: "inline-block",
  color: "white",
  lineHeight: "300px",
  fontSize: "40px",
  fontFamily: "fantasy",
  transition: "all 0.1s",
  borderRadius: "30px",
  ":hover": {
    backgroundColor: "white",
    color: "pink",
    transition: "all 0.1s",
  },
});

export default SelectBox;
