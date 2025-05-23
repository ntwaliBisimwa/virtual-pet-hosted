import React from "react";
import { GROWTH_STAGES } from "../utils/petConstants";

const PetDisplay = ({ age, growthStage, activity }) => {
  const stageEmoji = GROWTH_STAGES[growthStage]?.emoji || "❓";

  const activityOverlay = {
    eating: "🍽️",
    playing: "⚽",
    cleaning: "🛁",
    sleeping: "💤",
    null: "",
  };

  return (
    <div style={{ fontSize: "5rem", textAlign: "center", margin: "20px 0" }}>
      <div>{stageEmoji} {activityOverlay[activity]}</div>
      <p style={{ fontSize: "1rem" }}>Age: {age} days</p>
    </div>
  );
};

export default PetDisplay;
