import React, { useEffect, useState } from "react";
import { Menu } from "antd";

const EyebrowMenu = ({ selectEyebrow }) => {
  const [eyebrows, setEyebrows] = useState([]);
  const fetchData = () => {
    // fetch("/template", {
    //   method: "GET",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setEyebrows(data.templates);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setEyebrows([
      {
        createat: "Sun, 08 Nov 2020 14:43:39 GMT",
        id: 1,
        name: "default eyebrow",
        uri:
          "https://jphacks2020.s3-ap-northeast-1.amazonaws.com/templates/mayu-1.png",
      },
    ]);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Menu
      style={{
        width: 200,
        border: "none",
        position: "absolute",
        height: "480px",
        overflow: "scroll",
      }}
      defaultSelectedKeys={["1"]}
      mode="inline"
    >
      {eyebrows.map((eyebrow) => {
        return (
          <Menu.Item
            style={{
              fontSize: "20px",
              fontFamily: "book",
              letterSpacing: "2px",
              marginTop: "20px",
              color: "rgba(0, 0, 0, 0.5)",
            }}
            key={eyebrow.id}
            onClick={() => {
              selectEyebrow(eyebrow.uri);
            }}
          >
            {eyebrow.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default EyebrowMenu;
