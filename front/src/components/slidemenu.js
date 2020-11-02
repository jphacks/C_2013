import React from "react";
import "./slidemenu.css";
import SlideMenuButton from "./slidemenubutton";

const menus = ["EYEBROW", "LIP", "NOSE", "CHEAK"];

const SlideMenu = ({ toggle }) => {
  return (
    <div className="slide">
      {menus.map((menu) => {
        return (
          <p onClick={toggle} style={{ textAlign: "center", margin: "50px" }}>
            <SlideMenuButton value={menu} />
          </p>
        );
      })}
    </div>
  );
};

export default SlideMenu;
