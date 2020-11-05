import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  position: "absolute",
  top: "570px",
  fontSize: "27px",
  fontFamily: "book",
  color: "white",
  width: "100%",
  textAlign: "center",
  height: "50px",
  lineHeight: "50px",
});

const Direction = () => {
  const url = window.location.pathname;
  const message = {
    "/video/EYEBROW": "眉毛ラインをなぞってね",
    "/video/LIP": "リップラインを書いてね",
    "/video/HILIGHT": "ハイライトをひいてね",
    "/video/CHEAK": "四角の中にチークを入れてね",
  };
  return <StyledDiv>{message[url]}</StyledDiv>;
};

export default Direction;
