import React from "react";
import { Menu } from "antd";

const LipMenu = () => {
  return (
    <Menu
      style={{
        width: 300,
        marginLeft: "50px",
        border: "none",
        position: "absolute",
      }}
      defaultSelectedKeys={["normal"]}
      mode="inline"
    >
      <Menu.Item
        style={{
          fontSize: "30px",
          marginTop: "20px",
          color: "rgba(0, 0, 0, 0.5)",
        }}
        key="normal"
      >
        Normal
      </Menu.Item>
      <Menu.Item
        style={{
          fontSize: "30px",
          marginTop: "20px",
          color: "rgba(0, 0, 0, 0.5)",
        }}
        key="thin"
      >
        Thin
      </Menu.Item>
      <Menu.Item
        style={{
          fontSize: "30px",
          marginTop: "20px",
          color: "rgba(0, 0, 0, 0.5)",
        }}
        key="thick"
      >
        Thick
      </Menu.Item>
    </Menu>
  );
};

export default LipMenu;
