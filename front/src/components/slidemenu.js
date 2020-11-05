import React from "react";
import "./slidemenu.css";
import SlideMenuButton from "./slidemenubutton";

const SlideMenu = ({ menus, toggle }) => {
  return (
    <div className="slide">
      {menus.map((menu) => {
        return (
          <p onClick={toggle} style={{ textAlign: "center", margin: "20px" }}>
            <SlideMenuButton path={menu.path} value={menu.value} />
          </p>
        );
      })}
    </div>
  );
};

export default SlideMenu;
