import React from "react";
import { NavLink } from "react-router-dom";

const NavButton = ({ value }) => {
    return (
        <NavLink to={"/video/" + value} style={{ fontFamily: "book", textDecoration: "none", color: "rgba(0, 0, 0, 0.5", fontSize: "40px", margin: "0 30px" }} activeStyle={{ color: "rgb(235,0, 255)", textDecoration: "underline" }}>
            {value}
        </NavLink>
    );
};

export default NavButton;