import React from "react";
import { Carousel } from "antd";
import Button from "../components/button";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledP = styled.p({
  fontFamily: "arial black",
  color: "rgb(235, 0, 255)",
  fontSize: "23px",
  textAlign: "center",
})

const Introduction = ({ close }) => {
  const contentStyle = {
    height: "300px",
    color: "rgba(0, 0, 0, 0.7)",
    border: "1px solid rgb(235,0, 255)",
    margin: "auto",
    width: "80%",
    maxWidth: "500px",
    fontFamily: "book",
    padding: "60px 80px",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  };
  return (
    <>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>
            <StyledP>
              パーソナルカラーとは
            </StyledP>
            その人の生まれ持った身体の色（肌の色・髪の色・目の色など）と雰囲気が調和した色（＝似合う色）のことであり、人それぞれ個性が違うように似合う色もそれぞれ違うとする心理学的理論に基づく審美感のことである。
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <StyledP>
              パーソナルカラーの種類
            </StyledP>
            Spring, Summer, Autumn, Winterの4種類があります。
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <StyledP>
              パーソナルカラー診断について
            </StyledP>
            顔写真から、あなたのパーソナルカラーを判定します。
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <StyledP style={{ paddingTop: "70px" }}>
              さあ、はじめよう！
            </StyledP>
          </h3>
        </div>
      </Carousel>
      <Link to="/result">
        <Button handleClick={close} value="診断する" icon="CaretRightOutlined" />
      </Link>
    </>
  );
};

export default Introduction;
