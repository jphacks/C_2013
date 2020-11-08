import React from "react";
import "./logo.css";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

const StyledP = styled.p({
  fontFamily: "book",
  fontSize: "60px",
  color: "white",
  letterSpacing: "20px",
  paddingTop: "10%",
});

const Logo = ({ show }) => (
  <CSSTransition
    in={show}
    timeout={500}
    classNames="logo"
    mountOnEnter
    unmountOnExit
  >
    <div
      style={{
        position: "absolute",
        left: "0",
        right: "0",
        margin: "auto",
        paddingTop: "50px",
      }}
    >
      <StyledP>MAKEU</StyledP>
      <div className="rhombus" />
      <div className="circle" />
    </div>
  </CSSTransition>
);

export default Logo;
