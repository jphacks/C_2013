import React from "react";
import styled from "styled-components";
import Logo from "../components/logo";
import StartButton from "../components/startbutton";

const StyledDiv = styled.div({
  background: "linear-gradient(rgb(225, 123, 224), rgb(175, 225, 246))",
  textAlign: "center",
  position: "absolute",
  top: "0",
  bottom: "0",
  width: "100%",
});
const StyledP = styled.p({
  fontFamily: "book",
  fontSize: "60px",
  color: "white",
  letterSpacing: "20px",
  paddingTop: "10%",
});

const TopPage = () => {
  return (
    <div>
      <StyledDiv>
        <StyledP>MAKEU</StyledP>
        <Logo />
        <StartButton />
      </StyledDiv>
    </div>
  );
};

export default TopPage;
