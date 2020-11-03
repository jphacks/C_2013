import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../components/logo";
import Select from "../components/select";

const StyledDiv = styled.div({
  background: "linear-gradient(rgb(225, 123, 224), rgb(175, 225, 246))",
  textAlign: "center",
  width: "100%",
  minHeight: "1000px",
});
const StyledP = styled.p({
  fontFamily: "book",
  fontSize: "60px",
  color: "white",
  letterSpacing: "20px",
  paddingTop: "10%",
});

const TopPage = () => {
  const [isTitleShown, setTitleShown] = useState(true);
  setTimeout(() => {
    setTitleShown(false);
  }, 10000);
  return (
    <>
      <StyledDiv>
        {isTitleShown ? (
          <>
            <StyledP>MAKEU</StyledP>
            <Logo />
          </>
        ) : (
            <Select />
          )}
      </StyledDiv>
    </>
  );
};

export default TopPage;
