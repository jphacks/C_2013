import React from "react";
import styled from "styled-components";
import {
    CameraOutlined,
    FrownOutlined,
    SmileOutlined,
    CaretRightOutlined
} from "@ant-design/icons";

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
const Button = ({ value, handleClick }) => {
    return (
        <Btn onClick={handleClick}>
            <label style={{ fontSize: "25px", position: "absolute", left: "30px" }}>
                {value === "シャッター"
                    ? <CameraOutlined />
                    : value === "撮り直す"
                        ? <FrownOutlined />
                        : value === "確定" ? <SmileOutlined /> : <CaretRightOutlined />}
            </label>
            {value}
        </Btn>
    );
}

export default Button;