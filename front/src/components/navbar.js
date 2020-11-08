import React from "react";
import NavButton from "./navbutton";
import styled from "styled-components";

const Navbar = ({ navs }) => (
  <StyledDiv>
    {navs.map((nav) => (
      <NavButton nav={nav} />
    ))}
  </StyledDiv>
);

const StyledDiv = styled.div({
  position: "absolute",
  right: "0",
});

export default Navbar;
