import React from "react";

const NoImage = () => {
  return (
    <div
      style={{
        left: "0",
        right: "0",
        margin: "auto",
        width: "640px",
        height: "480px",
        backgroundColor: "black",
        textAlign: "center",
        lineHeight: "480px",
        color: "white",
        fontSize: "50px",
        letterSpacing: "10px",
        fontFamily: "book",
        zIndex: "-100",
        position: "absolute",
      }}
    >
      NO IMAGE
    </div>
  );
};

export default NoImage;
