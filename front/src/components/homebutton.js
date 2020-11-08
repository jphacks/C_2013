import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledDiv = styled.div({
  width: "40px",
  height: "40px",
  border: "2px solid pink",
  transform: "rotateZ(45deg) translateX(40px) translateY(-15px)",
  margin: "0 50px",
  textAlign: "center",
});

const StyledP = styled.p({
  color: "rgba(0, 0, 0, 0.5)",
  fontFamily: "book",
  fontSize: "15px",
  transform: "rotateZ(-45deg) translateX(-17px) translateY(4px)",
  letterSpacing: "2px",
});

const HomeButton = () => (
  <div style={{ position: "absolute", left: "0" }}>
    <Link to="/" style={{ textDecoration: "none" }}>
      <StyledDiv>
        <StyledP>MAKEU</StyledP>
      </StyledDiv>
    </Link>
  </div>
);

export default HomeButton;
