import React from "react";
import { Result } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import Header from "../components/header";
import { Link } from "react-router-dom";
import Recommendation from "../components/recommendation";
import Button from "../components/button";
import { Redirect } from "react-router-dom";

const colors = require("./resultpage.json");

const ResultPage = ({ personalColor }) => (
  <>
    <Header />
    <div
      style={{
        background:
          "linear-gradient(rgb(225, 123, 224), rgb(175, 225, 246), white)",
        height: window.innerHeight,
        transform: "translateY(-70px)",
      }}
    >
      <Result
        icon={<HeartOutlined style={{ color: "white" }} />}
        status="success"
        title={"あなたのパーソナルカラーは" + personalColor}
        subTitle={colors[personalColor]}
        extra={[
          <Recommendation personalColor={personalColor} />,
          <Link to="/color">
            <Button value="Try Again" icon="SearchOutlined" />
          </Link>,
        ]}
      />
    </div>
  </>
)

export default ResultPage;
