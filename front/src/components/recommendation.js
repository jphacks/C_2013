import React from "react";

const colors = require("./recommendation.json");

const Recommendation = ({ personalColor }) => {
  const recommendations = colors[personalColor];
  return (
    <div style={{ textAlign: "center", margin: "50px" }}>
      <p
        style={{
          fontFamily: "book",
          color: "rgba(0, 0, 0, 0.7)",
          fontSize: "60pz",
        }}
      >
        おすすめのカラー
      </p>
      {recommendations.map((color) => (
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: color,
            display: "inline-block",
            border: "solid 1px white",
          }}
        />
      ))}
    </div>
  );
};

export default Recommendation;
