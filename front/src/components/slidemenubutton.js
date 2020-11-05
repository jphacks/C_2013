import React from "react";
import { NavLink } from "react-router-dom";

const SlideMenuButton = ({ value, path }) => {
  return (
    <NavLink
      to={path}
      style={{
        fontFamily: "book",
        textDecoration: "none",
        color: "white",
        fontSize: "40px",
      }}
      activeStyle={{ color: "rgb(235,0, 255)", textDecoration: "underline" }}
    >
      {value}
    </NavLink>
  );
};

export default SlideMenuButton;
