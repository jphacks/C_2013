import React from "react";
import NavButton from "./navbutton";
import styled from "styled-components";

const StyledDiv = styled.div({
  position: "absolute",
  marginTop: "50px",
  right: "0",
});

const navs = ["EYEBROW", "LIP", "NOSE", "CHEAK"];

const Navbar = () => {
  return (
    <StyledDiv>
      {navs.map((nav) => {
        return <NavButton value={nav} />;
      })}
    </StyledDiv>
  );
};

export default Navbar;
