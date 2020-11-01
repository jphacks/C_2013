import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  position: "absolute",
  bottom: "10%",
  fontSize: "30px",
  fontFamily: "book",
  color: "white",
  width: "100%",
  textAlign: "center",
});

const Direction = () => {
  const url = window.location.pathname;
  const message = {
    "/video/EYEBROW": "眉毛ラインなぞってね",
    "/video/LIP": "リップラインを書いてね",
    "/video/NOSE": "ハイライトをひいてね",
  };
  return <StyledDiv>{message[url]}</StyledDiv>;
};

export default Direction;
