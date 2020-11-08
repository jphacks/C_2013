import React from "react";
import { Menu } from "antd";

const LipMenu = ({ selectLip }) => (
  <Menu
    style={{
      width: 200,
      border: "none",
      position: "absolute",
    }}
    defaultSelectedKeys={["normal"]}
    mode="inline"
  >
    <Menu.Item
      style={{
        fontSize: "20px",
        fontFamily: "book",
        letterSpacing: "2px",
        marginTop: "20px",
        color: "rgba(0, 0, 0, 0.5)",
      }}
      key="normal"
      onClick={() => {
        selectLip("normal");
      }}
    >
      Normal
      </Menu.Item>
    <Menu.Item
      style={{
        fontSize: "20px",
        fontFamily: "book",
        letterSpacing: "2px",
        marginTop: "20px",
        color: "rgba(0, 0, 0, 0.5)",
      }}
      key="thin"
      onClick={() => {
        selectLip("thin");
      }}
    >
      Thin
      </Menu.Item>
    <Menu.Item
      style={{
        fontSize: "20px",
        fontFamily: "book",
        letterSpacing: "2px",
        marginTop: "20px",
        color: "rgba(0, 0, 0, 0.5)",
      }}
      key="thick"
      onClick={() => {
        selectLip("thick");
      }}
    >
      Thick
      </Menu.Item>
  </Menu>
);

export default LipMenu;
