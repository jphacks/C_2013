import React from "react";
import "./slidemenu.css";
import SlideMenuButton from "./slidemenubutton";

const SlideMenu = ({ menus, toggleMenuShown }) => (
  <div className="slide">
    {menus.map((menu) => (
      <p onClick={toggleMenuShown} style={{ textAlign: "center", margin: "20px" }}>
        <SlideMenuButton path={menu.path} value={menu.value} />
      </p>
    ))}
  </div>
);

export default SlideMenu;
