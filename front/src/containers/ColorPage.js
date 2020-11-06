import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/header";
import NoImage from "../components/noimage";
import Introduction from "../components/introduction";
import {
  CameraOutlined,
  FrownOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import config from "../config.json";
const base_url = config[process.env.NODE_ENV]["backend"];

const Button = styled.div({
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
  height: "55px",
  lineHeight: "55px",
  letterSpacing: "2px",
  ":hover": {
    backgroundColor: "rgba(235, 49, 188, 0.35)",
    width: "389px",
    transition: "all 0.1s",
  },
});
const navs = [{ value: "EYEBROW", path: "/template/EYEBROW" }];

const ColorPage = ({ setImgURL }) => {
  const [isIntroShown, setIntroShwon] = useState(true);
  const close = () => {
    setIntroShwon(false);
  };
  useEffect(() => {
    const video = document.querySelector("#camera");
    const canvas = document.querySelector("#picture");

    /** カメラ設定 */
    const constraints = {
      audio: false,
      video: {
        width: 640,
        height: 480,
        facingMode: "user", // フロントカメラを利用する
        // facingMode: { exact: "environment" }  // リアカメラを利用する場合
      },
    };

    /**
     * カメラを<video>と同期
     */
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
          video.play();
        };
      })
      .catch((err) => {
        console.log(err.name + ": " + err.message);
      });

    /**
     * シャッターボタン
     */
    document.querySelector("#shutter").addEventListener("click", () => {
      const ctx = canvas.getContext("2d");
      setImageSubmitted(true);

      // canvasに画像を貼り付ける
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    });

    document.querySelector("#ok").addEventListener("click", () => {
      var can = document.getElementById("picture");
      var URL = can.toDataURL("image/png", 0.5);
      var dataURL = URL.substr(22);
      const body = { file: dataURL };
      fetch("/personal_color", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  const [isImageSubmitted, setImageSubmitted] = useState(false);
  const restart = () => {
    setImageSubmitted(false);
  };

  return (
    <div>
      <Header />
      {isIntroShown ? <Introduction close={close} /> : <NoImage />}
      <video
        id="camera"
        width="640"
        height="480"
        style={{
          position: "absolute",
          left: "0",
          right: "0",
          margin: "auto",
          visibility: isImageSubmitted || isIntroShown ? "hidden" : "visible",
          borderRadius: "20px",
        }}
      ></video>
      <div
        style={{
          visibility: isIntroShown || !isIntroShown ? "visible" : "hidden",
          margin: "0 auto",
          width: "640px",
          borderRadius: "20px",
        }}
      >
        <canvas
          id="picture"
          width="640"
          height="480"
          style={{ borderRadius: "20px" }}
        ></canvas>
      </div>
      <form>
        <Button
          id="shutter"
          style={{
            visibility: isImageSubmitted || isIntroShown ? "hidden" : "visible",
            position: "absolute",
            left: "0",
            right: "0",
            margin: "10px auto",
          }}
        >
          <label
            style={{ position: "absolute", left: "30px", fontSize: "25px" }}
          >
            <CameraOutlined />
          </label>
          シャッター
        </Button>
        <Button
          onClick={restart}
          style={{
            visibility:
              isImageSubmitted && !isIntroShown ? "visible" : "hidden",
            margin: "10px",
            position: "relative",
          }}
        >
          <label
            style={{ fontSize: "25px", position: "absolute", left: "30px" }}
          >
            <FrownOutlined />
          </label>
          撮り直す
        </Button>
        <Button
          id="ok"
          style={{
            visibility:
              isImageSubmitted && !isIntroShown ? "visible" : "hidden",
            margin: "10px",
            position: "relative",
          }}
        >
          <label
            style={{ fontSize: "25px", position: "absolute", left: "30px" }}
          >
            <SmileOutlined />
          </label>
          確認
        </Button>
      </form>
    </div>
  );
};

export default ColorPage;
