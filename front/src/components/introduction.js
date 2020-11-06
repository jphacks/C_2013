import React from "react";
import { Carousel } from "antd";
import styled from "styled-components";

const Button = styled.div({
  backgroundColor: "rgba(235, 49, 188, 0.6)",
  fontSize: "15px",
  color: "white",
  width: "300px",
  margin: "70px auto",
  textAlign: "center",
  borderRadius: "30px",
  transition: "all 0.1s",
  fontFamily: "arial black",
  height: "55px",
  lineHeight: "55px",
  letterSpacing: "2px",
  ":hover": {
    backgroundColor: "rgba(235, 49, 188, 0.35)",
    width: "290px",
    transition: "all 0.1s",
  },
});

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
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>
          <p
            style={{
              fontFamily: "arial black",
              color: "rgb(235, 0, 255)",
              fontSize: "23px",
              textAlign: "center",
            }}
          >
            パーソナルカラーとは
          </p>
          その人の生まれ持った身体の色（肌の色・髪の色・目の色など）と雰囲気が調和した色（＝似合う色）のことであり、人それぞれ個性が違うように似合う色もそれぞれ違うとする心理学的理論に基づく審美感のことである。
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <p
            style={{
              fontFamily: "arial black",
              color: "rgb(235, 0, 255)",
              fontSize: "23px",
              textAlign: "center",
            }}
          >
            パーソナルカラーの種類
          </p>
          Spring, Summer, Autumn, Winterの4種類があります。
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <p
            style={{
              fontFamily: "arial black",
              color: "rgb(235, 0, 255)",
              fontSize: "23px",
              textAlign: "center",
            }}
          >
            パーソナルカラー診断について
          </p>
          顔写真から、あなたのパーソナルカラーを判定します。
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <p
            style={{
              fontFamily: "arial black",
              color: "rgb(235, 0, 255)",
              fontSize: "23px",
              textAlign: "center",
              paddingTop: "40px",
            }}
          >
            さあ、はじめよう！
          </p>
          <Button onClick={close}>今すぐ診断</Button>
        </h3>
      </div>
    </Carousel>
  );
};

export default Introduction;
