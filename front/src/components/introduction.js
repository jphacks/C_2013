import React from "react";
import { Carousel, message } from "antd";
import Button from "../components/button";
import styled from "styled-components";
import { Link } from "react-router-dom";

const messages = require("./introduction.json");

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

const Introduction = ({ close }) => (
  <>
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>
          <StyledP>{messages.page1.title}</StyledP>
          {messages.page1.content}
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <StyledP>{messages.page2.title}</StyledP>
          {messages.page2.content}
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <StyledP>{messages.page3.title}</StyledP>
          {messages.page3.content}
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <StyledP style={{ paddingTop: "70px" }}>
            {messages.page4.title}
          </StyledP>
        </h3>
      </div>
    </Carousel>
    <Link to="/result">
      <Button handleClick={close} value="診断する" icon="CaretRightOutlined" />
    </Link>
  </>
);

const StyledP = styled.p({
  fontFamily: "arial black",
  color: "rgb(235, 0, 255)",
  fontSize: "23px",
  textAlign: "center",
});

export default Introduction;
