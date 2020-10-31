import React, { useState, useEffect, useRef, createRef } from "react";

const LOOP_WAIT_TIME = 250;

export default function VideoFeed() {
  const canvasEl = useRef(null);
  const dummycanvasEl = useRef(null);
  const videoEl = useRef(null);
  const [loopInvoke, setLoopInvoke] = useState(false);
  const [count, setCount] = useState(0);

  const detect = async () => {
    const video = videoEl.current;

    const canvasElement = canvasEl.current;
    const canvas = canvasElement.getContext("2d");

    const dummyCanvasElement = dummycanvasEl.current;
    const dummyCanvas = dummyCanvasElement.getContext("2d");

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;

    dummyCanvasElement.height = video.videoHeight;
    dummyCanvasElement.width = video.videoWidth;

    dummyCanvas.drawImage(
      video,
      0,
      0,
      dummyCanvasElement.width,
      dummyCanvasElement.height
    );
    // let imageData = canvas.getImageData(
    //   0,
    //   0,
    //   canvasElement.width,
    //   canvasElement.height
    // );
    const dataURI = dummyCanvasElement
      .toDataURL("image/png", 0.5)
      .replace(/^.*,/, "");
    const img_data = await postData(dataURI);

    //画像オブジェクトを生成
    var img = new Image();
    img.src = "data:image/png;base64," + img_data;
    //画像をcanvasに設定
    img.onload = function () {
      canvas.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
    };
  };

  const postData = async (input) => {
    const body = { file: input };
    let image_data = "";
    await fetch("/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        image_data = data.image;
      })
      .catch((err) => {
        console.log(err);
      });

    return image_data;
  };

  // ループ処理
  useEffect(async () => {
    setCount(count + 1);
    await detect();
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
      <canvas ref={dummycanvasEl} />
    </div>
  );
}
