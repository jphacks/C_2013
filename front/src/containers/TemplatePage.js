import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/header";

const Button = styled.div({
  backgroundColor: "rgba(235, 49, 188, 0.7)",
  fontSize: "20px",
  color: "white",
  width: "150px",
  margin: "10px auto",
  textAlign: "center",
  padding: "10px",
  borderRadius: "15px",
  transition: "all 0.1s",
  display: "inline-block",
  ":hover": {
    backgroundColor: "rgba(235, 49, 188, 0.4)",
    transition: "all 0.1s"
  }
})
const navs = [{ value: "EYEBROW", path: "/template/EYEBROW" }];

const TemplatePage = () => {
  const [isLoaded, setLoaded] = useState(false);

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
      var can = document.getElementById('picture');
      var URL = can.toDataURL("image/png", 0.5);
      var dataURL = URL.substr(22)
      const body = { file: dataURL };

      const api = { "/template/EYEBROW": "/template/eyebrow" }
      const endpoint = window.location.pathname

      fetch(api[endpoint], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
        })
        .catch((err) => {
          console.log(err);
        });
    })

  }, [isLoaded]);

  const [isImageSubmitted, setImageSubmitted] = useState(false);
  const restart = () => {
    setImageSubmitted(false);
  }


  return (
    <div style={{ height: window.innerHeight, textAlign: "center" }}>
      <Header navs={navs} />
      <video
        id="camera"
        width="640"
        height="480"
        style={{ position: "absolute", left: "0", right: "0", margin: "auto", visibility: isImageSubmitted ? "hidden" : "visible", borderRadius: "20px" }}
      ></video>
      <div style={{ visibility: isImageSubmitted ? "visible" : "hidden", margin: "0 auto", width: "640px", borderRadius: "20px" }}>
        <canvas
          id="picture"
          width="640"
          height="480"
          style={{ borderRadius: "20px" }}
        ></canvas>
      </div>
      <form>
        <Button id="shutter" style={{ visibility: isImageSubmitted ? "hidden" : "visible", position: "absolute", left: "0", right: "0", margin: "10px auto" }}>
          シャッター
        </Button>
        <Button onClick={restart} style={{ visibility: isImageSubmitted ? "visible" : "hidden", margin: "10px" }}>
          撮り直す
        </Button>
        <Button id="ok" style={{ visibility: isImageSubmitted ? "visible" : "hidden", margin: "10px" }}>
          確定
          </Button>
      </form>
    </div>
  );
};

export default TemplatePage;
