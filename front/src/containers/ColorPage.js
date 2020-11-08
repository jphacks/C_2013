import React, { useState, useEffect } from "react";
import Header from "../components/header";
import NoImage from "../components/noimage";
import Introduction from "../components/introduction";
import Button from "../components/button";
import { Link } from "react-router-dom"
import config from "../config.json";

const ColorPage = ({ setPersonalColor }) => {
  const [isIntroShown, setIntroShwon] = useState(true);
  const close = () => {
    setIntroShwon(false);
  };
  const [color, setColor] = useState("")

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
  // シャッター
  const shutter = () => {
    const video = document.querySelector("#camera");
    const canvas = document.querySelector("#picture");
    console.log("test")
    const ctx = canvas.getContext("2d");
    setImageSubmitted(true);

    // canvasに画像を貼り付ける
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  const ok = () => {
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
        setPersonalColor(data.result);
        setColor(data.result)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div style={{ textAlign: "center" }}>
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
        {isImageSubmitted && !isIntroShown ?
          <>
            <Button value="撮り直す" handleClick={restart} />
            <Link to={{ pathname: "/result", state: { color: color } }} style={{ color: "white" }} >
              <Button value="確定" handleClick={ok} />
            </Link>
          </>
          : isIntroShown ? <></>
            : <Button value="シャッター" handleClick={shutter} />}
      </form>
    </div>
  );
};

export default ColorPage;
