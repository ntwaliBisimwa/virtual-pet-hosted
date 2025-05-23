import React from "react";
import { ACHIEVEMENTS } from "../utils/achievements";

const AchievementsPanel = ({ unlocked }) => {
  return (
    <div
      style={{
        padding: "20px",
        marginTop: "20px",
        border: "2px solid #444",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>🏆 Achievements</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlocked.includes(ach.id);
          return (
            <li
              key={ach.id}
              style={{
                backgroundColor: isUnlocked ? "#e0ffe0" : "#eeeeee",
                color: isUnlocked ? "#2e7d32" : "#666",
                padding: "12px",
                borderRadius: "6px",
                marginBottom: "10px",
                fontWeight: isUnlocked ? "bold" : "normal",
                boxShadow: isUnlocked ? "0 0 4px rgba(0,0,0,0.1)" : "none",
                opacity: isUnlocked ? 1 : 0.7,
              }}
            >
              <div>{ach.label}</div>
              <div style={{ fontSize: "0.9rem" }}>{ach.description}</div>
              {!isUnlocked && (
                <div style={{ fontSize: "0.8rem", color: "#888" }}>Locked</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AchievementsPanel;
