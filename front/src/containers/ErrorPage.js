import React from "react";
import { Result } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Button from "../components/button";

const ErrorPage = () => (
  <Result
    icon={<WarningOutlined style={{ color: "white" }} />}
    style={{
      fontFamily: "book",
      color: "white",
      background:
        "linear-gradient(rgb(225, 123, 224), rgb(175, 225, 246), white)",
    }}
    title="エラーが発生しました。ホームへ戻ります。"
    extra={
      <Link to="/">
        <Button value="ホームへ戻る" icon="HomeOutlined" />
      </Link>
    }
  />
);

export default ErrorPage;
