import React, { useState, useEffect, useRef, useCallback } from "react";
import MediaQuery from "react-responsive";
import SlideMenu from "../components/slidemenu";
import Header from "../components/header";
import Direction from "../components/direction";
import LipMenu from "../components/lipmenu";
import NoImage from "../components/noimage";

const LOOP_WAIT_TIME = 250;

export default function VideoFeed() {
  const canvasEl = useRef(null);
  const dummycanvasEl = useRef(null);
  const videoEl = useRef(null);
  const [loopInvoke, setLoopInvoke] = useState(false);
  const [count, setCount] = useState(0);
  const [hasImage, setHasImage] = useState(false);

  const detect = useCallback(async () => {
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
  }, []);

  const postData = async (input) => {
    const body = { file: input };
    let image_data = "";
    const endpoint = window.location.pathname;
    const message = {
      "/video/EYEBROW": "/mayu",
      "/video/LIP": "/lip",
      "/video/NOSE": "/nose",
      "/video/CHEAK": "/cheak",
      "/video/eyebrow_template": "/template/eyebrow",
    };
    await fetch(message[endpoint], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:
        endpoint === "/video/LIP"
          ? JSON.stringify({ ...body, lip: "normal" })
          : JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        image_data = data.image;
        setHasImage(true);
      })
      .catch((err) => {
        console.log(err);
        setHasImage(false);
      });

    return image_data;
  };

  // ループ処理
  useEffect(() => {
    async function fetchData() {
      setCount((c) => c + 1);
      await detect();
      setTimeout(() => setLoopInvoke((v) => !v), LOOP_WAIT_TIME);
    }
    fetchData();
  }, [loopInvoke, detect]);

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

  const navs = [
    { value: "EYEBROW", path: "/video/EYEBROW" },
    { value: "LIP", path: "/video/LIP" },
    { value: "NOSE", path: "/video/NOSE" },
    { value: "CHEAK", path: "/video/CHEAK" },
  ];

  return (
    <div>
      <Header isMenuShown={isMenuShown} toggle={toggle} navs={navs} />
      <MediaQuery query="(max-width: 870px)">
        {isMenuShown ? <SlideMenu toggle={toggle} /> : <></>}
      </MediaQuery>
      <Direction />
      {window.location.pathname === "/video/LIP" ? <LipMenu /> : <></>}
      <div style={{ textAlign: "center" }}>
        <NoImage />
        {hasImage ? (
          <canvas ref={canvasEl} width="640" height="480" />
        ) : (
          <canvas ref={canvasEl} style={{ visibility: "hidden" }} />
        )}
      </div>
      <div style={{ textAlign: "center", visibility: "hidden" }}>
        <video ref={videoEl} />
      </div>
      <div style={{ textAlign: "center", visibility: "hidden" }}>
        <canvas ref={dummycanvasEl} />
      </div>
    </div>
  );
}
