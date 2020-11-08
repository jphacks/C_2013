import React from "react";
import styled from "styled-components";
import * as antIcon from "@ant-design/icons";

const Button = ({ value, handleClick, icon }) => {
  const Icon = antIcon[icon];
  return (
    <Btn onClick={handleClick}>
      <label style={{ fontSize: "25px", position: "absolute", left: "30px" }}>
        <Icon />
      </label>
      {value}
    </Btn>
  );
};

const Btn = styled.div({
  backgroundColor: "rgba(235, 49, 188, 0.6)",
  fontSize: "15px",
  color: "white",
  width: "400px",
  margin: "10px auto",
  textAlign: "center",
  borderRadius: "30px",
  transition: "all 0.1s",
  display: "inline-block",
  fontFamily: "arial black",
  position: "relative",
  height: "55px",
  lineHeight: "55px",
  letterSpacing: "2px",
  ":hover": {
    backgroundColor: "rgba(235, 49, 188, 0.35)",
    width: "389px",
    transition: "all 0.1s",
  },
});

export default Button;
