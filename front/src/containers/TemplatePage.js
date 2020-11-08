import React, { useState, useEffect } from "react";
import Header from "../components/header";
import NoImage from "../components/noimage";
import MediaQuery from "react-responsive";
import SlideMenu from "../components/slidemenu";
import { Link } from "react-router-dom";
import Button from "../components/button";

import config from "../config.json";
const base_url = config[process.env.NODE_ENV]["backend"];
const navs = [{ value: "EYEBROW", path: "/template/EYEBROW" }];

const TemplatePage = ({ setImgURL }) => {
  useEffect(() => {
    const video = document.querySelector("#camera");
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
  }, []);

  const [isImageSubmitted, setImageSubmitted] = useState(false);
  const restart = () => {
    setImageSubmitted(false);
  };
  const [isMenuShown, setMenuShown] = useState(false);
  const toggleMenuShown = () => {
    setMenuShown(!isMenuShown);
  };

  // シャッター
  const shutter = () => {
    const video = document.querySelector("#camera");
    const canvas = document.querySelector("#picture");
    const ctx = canvas.getContext("2d");
    setImageSubmitted(true);

    // canvasに画像を貼り付ける
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  };

  const ok = () => {
    var can = document.getElementById("picture");
    var URL = can.toDataURL("image/png", 0.5);
    var dataURL = URL.substr(22);
    setImgURL(dataURL);
  };

  return (
    <div style={{ height: window.innerHeight, textAlign: "center" }}>
      <Header navs={navs} toggleMenuShown={toggleMenuShown} />
      <MediaQuery query="(max-width: 870px)">
        {isMenuShown && (
          <SlideMenu menus={navs} toggleMenuShown={toggleMenuShown} />
        )}
      </MediaQuery>
      <NoImage />
      <video
        id="camera"
        width="640"
        height="480"
        style={{
          position: "absolute",
          left: "0",
          right: "0",
          margin: "auto",
          visibility: isImageSubmitted ? "hidden" : "visible",
          borderRadius: "20px",
        }}
      ></video>
      <div
        style={{
          visibility: isImageSubmitted ? "visible" : "hidden",
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
        {isImageSubmitted ? (
          <>
            <Button
              value="撮り直す"
              handleClick={restart}
              icon="FrownOutlined"
            />
            <Link to="/confirmation" style={{ color: "white" }}>
              <Button value="確定" handleClick={ok} icon="SmileOutlined" />
            </Link>
          </>
        ) : (
          <Button
            value="シャッター"
            handleClick={shutter}
            icon="CameraOutlined"
          />
        )}
      </form>
    </div>
  );
};

export default TemplatePage;
