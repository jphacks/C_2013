import React, { useState, useEffect, useRef } from "react";
import MediaQuery from "react-responsive";
import SlideMenu from "../components/slidemenu";
import Header from "../components/header";

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

    dummyCanvasElement.height = video.videoHeight;
    dummyCanvasElement.width = video.videoWidth;

    dummyCanvas.drawImage(
      video,
      0,
      0,
      dummyCanvasElement.width,
      dummyCanvasElement.height
    );

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

  const [isMenuShown, setMenuShown] = useState(false);
  const toggle = () => {
    setMenuShown(!isMenuShown);
  };

  return (
    <div>
      <Header isMenuShown={isMenuShown} toggle={toggle} />
      <MediaQuery query="(max-width: 870px)">
        {isMenuShown ? <SlideMenu toggle={toggle} /> : <></>}
      </MediaQuery>
      <div style={{ textAlign: "center" }}>
        <video ref={videoEl} />
      </div>
      <div style={{ textAlign: "center" }}>
        <canvas ref={canvasEl} width="640" height="480" />
      </div>
      <div style={{ textAlign: "center" }}>
        <canvas ref={dummycanvasEl} width="0" height="0" />
      </div>
    </div>
  );
}
