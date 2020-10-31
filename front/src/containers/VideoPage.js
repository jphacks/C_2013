import React, { useState, useEffect, useRef } from "react";

const LOOP_WAIT_TIME = 500;

export default function VideoFeed() {
  const canvasEl = useRef(null);
  const dummyCanvasEl = useRef(null);
  const videoEl = useRef(null);
  const [loopInvoke, setLoopInvoke] = useState(false);
  const [count, setCount] = useState(0);

  const detect = async () => {
    const video = videoEl.current;

    const canvasElement = canvasEl.current;
    const canvas = canvasElement.getContext("2d");

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;

    if (count === 1) {
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    }
    // let imageData = canvas.getImageData(
    //   0,
    //   0,
    //   canvasElement.width,
    //   canvasElement.height
    // );
    const dataURI = canvasElement.toDataURL().replace(/^.*,/, "");
    const data = postData(dataURI);

    //画像オブジェクトを生成
    var img = new Image();
    img.src = data;
    //画像をcanvasに設定
    img.onload = function () {
      canvas.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
    };
  };

  const postData = async (input) => {
    const body = { file: input };
    return await fetch("/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // ループ処理
  useEffect(() => {
    setCount(count + 1);
    detect();
    setTimeout(() => setLoopInvoke((v) => !v), LOOP_WAIT_TIME);
  }, [loopInvoke]);

  useEffect(() => {
    if (!videoEl) {
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      let video = videoEl.current;
      video.srcObject = stream;
      video.play();
    });
  }, [videoEl]);

  return (
    <div>
      <video ref={videoEl} />
      <canvas ref={canvasEl} />
    </div>
  );
}
