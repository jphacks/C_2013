import React from "react";
import { MenuOutlined } from "@ant-design/icons";

const MenuButton = ({ toggleMenuShown }) => (
  <div
    style={{
      fontSize: "35px",
      color: "rgba(0, 0, 0, 0.3)",
      position: "absolute",
      right: "50px",
      top: "8px",
      zIndex: "100",
    }}
  >
    <MenuOutlined onClick={toggleMenuShown} />
  </div>
);

export default MenuButton;
