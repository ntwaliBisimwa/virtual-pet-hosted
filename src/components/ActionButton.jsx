import React from "react";

const ActionButton = ({ onClick, emoji, label, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontSize: "1.2rem",
        padding: "10px 15px",
        margin: "5px",
        backgroundColor: disabled ? "#ccc" : "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        width: "45%",
      }}
    >
      {emoji} {label}
    </button>
  );
};

export default ActionButton;
