import React, { useEffect, useState } from "react";
import { Menu } from "antd";

const EyebrowMenu = ({ selectEyebrow }) => {
  const [eyebrows, setEyebrows] = useState([]);
  const fetchData = () => {
    fetch("/template", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setEyebrows(data.templates);
      })
      .catch((err) => {
        console.log(err);
      });
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
