import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../components/logo";
import Select from "../components/select";

const StyledDiv = styled.div({
  background: "linear-gradient(rgb(225, 123, 224), rgb(175, 225, 246))",
  textAlign: "center",
  width: "100%",
  minHeight: window.innerHeight,
  paddingBottom: "100px",
});

const TopPage = () => {
  const [isTitleShown, setTitleShown] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setTitleShown(false);
    }, 10000);
  }, []);

  return (
    <StyledDiv
      onClick={() => {
        setTitleShown(false);
      }}
    >
      <Logo show={isTitleShown} />
      {!isTitleShown && <Select />}
    </StyledDiv>
  );
};

export default TopPage;
