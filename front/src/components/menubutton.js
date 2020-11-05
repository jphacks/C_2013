import React from "react";
import { MenuOutlined } from "@ant-design/icons";

const MenuButton = ({ toggle }) => {
  return (
    <div
      style={{
        fontSize: "35px",
        color: "rgba(235,0, 255, 0.7)",
        position: "absolute",
        right: "50px",
        top: "8px",
        zIndex: "100",
      }}
    >
      <MenuOutlined onClick={toggle} />
    </div>
  );
};

export default MenuButton;
