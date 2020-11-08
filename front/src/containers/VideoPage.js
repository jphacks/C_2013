import React, { useState, useEffect, useRef, useCallback } from "react";
import MediaQuery from "react-responsive";
import SlideMenu from "../components/slidemenu";
import Header from "../components/header";
import Direction from "../components/direction";
import LipMenu from "../components/lipmenu";
import NoImage from "../components/noimage";
import EyebrowMenu from "../components/eyebrowmenu";

import config from "../config.json";
const base_url = config[process.env.NODE_ENV]["backend"];

const LOOP_WAIT_TIME = 250;

export default function VideoFeed() {
  const [whichEyebrow, setWhichEyebrow] = useState();
  const selectEyebrow = (uri) => {
    setWhichEyebrow(uri);
  };

  const [whichLip, setWhichLip] = useState("normal");
  const selectLip = (uri) => {
    setWhichLip(uri);
  };
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
    const img_data = await postData(dataURI, whichLip, whichEyebrow);

    //画像オブジェクトを生成
    var img = new Image();
    img.src = "data:image/png;base64," + img_data;
    //画像をcanvasに設定
    img.onload = function () {
      canvas.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
    };
  }, [whichEyebrow, whichLip]);

  const postData = async (input, lip, eyebrow) => {
    const body = { file: input };
    let image_data = "";
    const endpoint = window.location.pathname;
    const message = {
      "/video/EYEBROW": "/mayu",
      "/video/LIP": "/lip",
      "/video/HILIGHT": "/nose",
      "/video/CHEAK": "/cheak",
      "/video/eyebrow_template": "/template/eyebrow",
    };
    await fetch(base_url + message[endpoint], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:
        endpoint === "/video/LIP"
          ? JSON.stringify({ ...body, lip: lip })
          : endpoint === "/video/EYEBROW"
          ? JSON.stringify({ ...body, img_uri: eyebrow })
          : JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        image_data = data.image;
        setHasImage(true);
      })
      .catch((err) => {
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
      console.log(whichEyebrow);
    });
  }, [videoEl]);

  const [isMenuShown, setMenuShown] = useState(false);
  const toggle = () => {
    setMenuShown(!isMenuShown);
  };

  const navs = [
    { value: "EYEBROW", path: "/video/EYEBROW" },
    { value: "LIP", path: "/video/LIP" },
    { value: "HILIGHT", path: "/video/HILIGHT" },
    { value: "CHEAK", path: "/video/CHEAK" },
  ];

  return (
    <div>
      <Header isMenuShown={isMenuShown} toggle={toggle} navs={navs} />
      <MediaQuery query="(max-width: 870px)">
        {isMenuShown ? <SlideMenu menus={navs} toggle={toggle} /> : <></>}
      </MediaQuery>
      <Direction />
      {window.location.pathname === "/video/EYEBROW" ? (
        <EyebrowMenu selectEyebrow={selectEyebrow} />
      ) : (
        <></>
      )}
      {window.location.pathname === "/video/LIP" ? (
        <LipMenu selectLip={selectLip} />
      ) : (
        <></>
      )}
      <div style={{ textAlign: "center" }}>
        <NoImage />
        {hasImage ? (
          <canvas
            ref={canvasEl}
            width="640"
            height="480"
            style={{ borderRadius: "20px" }}
          />
        ) : (
          <canvas ref={canvasEl} style={{ visibility: "hidden" }} />
        )}
      </div>
      <div style={{ textAlign: "center", visibility: "hidden" }}>
        <video ref={videoEl} style={{ borderRadius: "20px" }} />
      </div>
      <div style={{ textAlign: "center", visibility: "hidden" }}>
        <canvas ref={dummycanvasEl} style={{ borderRadius: "20px" }} />
      </div>
    </div>
  );
}
