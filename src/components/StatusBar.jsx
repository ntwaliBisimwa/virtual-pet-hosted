import React from "react";

const getBarColor = (value) => {
  if (value >= 70) return "#4caf50"; // green
  if (value >= 40) return "#ff9800"; // orange
  return "#f44336"; // red
};

const StatusBar = ({ label, value }) => {
  const rounded = Math.round(value);
  const barColor = getBarColor(rounded);

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={{ display: "block", fontWeight: "bold" }}>{label}</label>
      <div style={{
        backgroundColor: "#ddd",
        borderRadius: "5px",
        overflow: "hidden",
        height: "15px"
      }}>
        <div
          style={{
            width: `${rounded}%`,
            backgroundColor: barColor,
            height: "100%"
          }}
        ></div>
      </div>
      <div style={{ fontSize: "0.8rem", textAlign: "right" }}>{rounded}%</div>
    </div>
  );
};

export default StatusBar;
