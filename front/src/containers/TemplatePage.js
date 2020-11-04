import React, { useState, useEffect } from "react";

const TemplatePage = () => {
  const [isLoaded, setLoaded] = useState(false);
  //window.onload = () => {
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

      // 演出的な目的で一度映像を止めてSEを再生する
      video.pause(); // 映像を停止
      setImageSubmitted(true);
      // setTimeout(() => {
      video.play(); // 0.5秒後にカメラ再開
      //}, 500);

      // canvasに画像を貼り付ける
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    });
  }, [isLoaded]);

  const [isImageSubmitted, setImageSubmitted] = useState(false);
  const restart = () => {
    setImageSubmitted(false);
  }

  return (
    <>
      <video
        id="camera"
        width="640"
        height="480"
        style={{ position: "absolute", visibility: isImageSubmitted ? "hidden" : "visible" }}
      ></video>
      <canvas
        id="picture"
        width="640"
        height="480"
        style={{ visibility: isImageSubmitted ? "visible" : "hidden" }}
      ></canvas>
      <form>
        <button type="button" onClick={restart}>
          撮り直す
        </button>
        <button type="button" id="shutter">
          シャッター
        </button>
      </form>
    </>
  );
};

export default TemplatePage;
