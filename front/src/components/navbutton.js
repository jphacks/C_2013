import React from "react";
import { NavLink } from "react-router-dom";

const NavButton = ({ nav }) =>
  <NavLink
    to={nav.path}
    style={{
      fontFamily: "book",
      textDecoration: "none",
      color: "rgba(0, 0, 0, 0.5",
      fontSize: "25px",
      margin: "0 30px",
      lineHeight: "70px",
      letterSpacing: "2px",
      transition: "all 0.1s",
    }}
    activeStyle={{ color: "rgb(235,0, 255)", textDecoration: "underline" }}
  >
    {nav.value}
  </NavLink>;

export default NavButton;
