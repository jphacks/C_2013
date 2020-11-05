import React from "react";
import NavButton from "./navbutton";
import styled from "styled-components";

const StyledDiv = styled.div({
  position: "absolute",
  marginTop: "50px",
  right: "0",
});

const Navbar = ({ navs }) => {
  return (
    <StyledDiv>
      {navs.map((nav) => {
        return <NavButton nav={nav} />;
      })}
    </StyledDiv>
  );
};

export default Navbar;
