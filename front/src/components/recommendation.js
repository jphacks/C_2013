import React from "react";

const colors = {
  "spring": ["#E5805B", "#846495", "#8CD3D6", "#C2DD97", "#987128"],
  "summer": ["#CE5374", "#FFF8AA", "#CFC6ED", "#6EC3A8", "#A3A3A3"],
  "autumn": ["#C97156", "#2E8A9B", "#7C3E8B", "#EAC45E", "#EDE6D3"],
  "winter": ["#DE4E8B", "#405EAF", "#65B791", "#2D2F36", "#FFFFFF"],
};

const Recommendation = ({ personalColor }) => {
  const recommendations = colors["summer"];
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
      {recommendations.map((color) => {
        return (
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: color,
              display: "inline-block",
              border: "solid 1px white",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Recommendation;
