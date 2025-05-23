import { useState, useEffect } from "react";
import { ACHIEVEMENTS } from "../utils/achievements";

export default function useAchievements(petState, activityLog) {
  const [unlocked, setUnlocked] = useState(() => {
    const saved = localStorage.getItem("achievements");
    return saved ? JSON.parse(saved) : [];
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const newlyUnlocked = [];

    // Basic checks 
    if (!unlocked.includes("first-feed") && activityLog.feed > 0) {
      newlyUnlocked.push("first-feed");
    }

    if (!unlocked.includes("clean-freak") && activityLog.clean >= 5) {
      newlyUnlocked.push("clean-freak");
    }

    if (!unlocked.includes("playful-pal") && activityLog.play >= 5) {
      newlyUnlocked.push("playful-pal");
    }

    if (!unlocked.includes("bond-builder") && petState.stats.bond >= 100) {
      newlyUnlocked.push("bond-builder");
    }

    if (!unlocked.includes("happy-pet") && petState.stats.happiness >= 100) {
      newlyUnlocked.push("happy-pet");
    }

    if (!unlocked.includes("health-champion") && petState.stats.health >= 100) {
      newlyUnlocked.push("health-champion");
    }

    if (!unlocked.includes("age-master") && petState.growthStage === "adult") {
      newlyUnlocked.push("age-master");
    }

    if (newlyUnlocked.length > 0) {
      const updated = [...unlocked, ...newlyUnlocked];
      setUnlocked(updated);
      localStorage.setItem("achievements", JSON.stringify(updated));
      setNotification(`Unlocked: ${newlyUnlocked.map(id => 
        ACHIEVEMENTS.find(a => a.id === id)?.label).join(", ")}`);
      
      // Clear notification after 4 seconds
      setTimeout(() => setNotification(null), 4000);
    }

  }, [petState, activityLog]);

  return { unlocked, notification };
}
