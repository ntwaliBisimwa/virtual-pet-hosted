import React from "react";
import usePet from "./hooks/usePet";
import PetDisplay from "./components/PetDisplay";
import StatusBar from "./components/StatusBar";
import ActionButton from "./components/ActionButton";
import AchievementsPanel from "./components/AchievementsPanel";

function App() {
  const {
    petState,
    feedPet,
    playWithPet,
    cleanPet,
    toggleSleep,
    unlockedAchievements,
    achievementNotification,
  } = usePet();

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h1>🐣 Virtual Pet</h1>

      <PetDisplay
        age={petState.age}
        growthStage={petState.growthStage}
        activity={petState.activity}
      />

      {achievementNotification && (
        <div
          style={{
            backgroundColor: "#dff0d8",
            color: "#3c763d",
            padding: "10px 20px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #3c763d",
            fontWeight: "bold",
          }}
        >
          🎉 {achievementNotification}
        </div>
      )}

      {/* Status bars */}
      {Object.entries(petState.stats).map(([key, value]) => (
        <StatusBar key={key} label={key.toUpperCase()} value={value} />
      ))}

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <ActionButton
          label="Feed"
          emoji="🍽️"
          onClick={feedPet}
          disabled={petState.activity === "sleeping"}
        />
        <ActionButton
          label="Play"
          emoji="⚽"
          onClick={playWithPet}
          disabled={petState.activity === "sleeping"}
        />
        <ActionButton
          label="Clean"
          emoji="🛁"
          onClick={cleanPet}
          disabled={petState.activity === "sleeping"}
        />
        <ActionButton
          label={petState.activity === "sleeping" ? "Wake" : "Sleep"}
          emoji="💤"
          onClick={toggleSleep}
        />
      </div>

      <AchievementsPanel unlocked={unlockedAchievements} />
    </div>
  );
}

export default App;
