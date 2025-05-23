import { useState, useEffect } from "react";
import { GROWTH_STAGES } from "../utils/petConstants";
import { calculateAge } from "../utils/ageUtils";
import useTimePassage from "./useTimePassage";
import useLocalStorage from "./useLocalStorage";
import { minutesElapsedSince } from "../utils/timeUtils";
import useAchievements from "./useAchievements";

export default function usePet() {
  const now = Date.now();

  const [activityLog, setActivityLog] = useState({
    feed: 0,
    play: 0,
    clean: 0,
  });

  const [petState, setPetState] = useLocalStorage("virtual-pet", {
    stats: {
      hunger: 80,
      energy: 75,
      happiness: 90,
      health: 85,
      cleanliness: 70,
      bond: 50,
    },
    activity: null,
    birthDate: now,
    lastInteraction: now,
    lastVisited: now,
    age: 0,
    growthStage: "baby",
  });

  // Handle time gap decay
  useEffect(() => {
    const minutesAway = minutesElapsedSince(petState.lastVisited);

    if (minutesAway > 0) {
      setPetState((prev) => {
        const decayedHunger = Math.max(0, prev.stats.hunger - minutesAway * 3);
        const decayedCleanliness = Math.max(0, prev.stats.cleanliness - minutesAway * 2);
        const decayedEnergy = Math.max(0, prev.stats.energy - minutesAway * 2);
        const decayedHappiness = Math.max(0, prev.stats.happiness - minutesAway * 2);
        const decayedBond = Math.max(0, prev.stats.bond - minutesAway);

        let decayedHealth = prev.stats.health;
        if (decayedHunger < 20 || decayedCleanliness < 20) {
          decayedHealth = Math.max(0, decayedHealth - minutesAway * 4);
        }

        const newStats = {
          hunger: decayedHunger,
          energy: decayedEnergy,
          happiness: decayedHappiness,
          cleanliness: decayedCleanliness,
          health: decayedHealth,
          bond: decayedBond,
        };

        return {
          ...prev,
          stats: newStats,
          age: prev.age + minutesAway,
          lastVisited: Date.now(),
        };
      });
    }
  }, []);

  // Stat decay over time
  useTimePassage(petState, setPetState);

  // Age and growth stage updates
  useEffect(() => {
    const interval = setInterval(() => {
      const age = calculateAge(petState.birthDate);
      let stage = "baby";

      for (const [key, value] of Object.entries(GROWTH_STAGES)) {
        if (age >= value.min && age <= value.max) {
          stage = key;
          break;
        }
      }

      setPetState((prev) => ({
        ...prev,
        age,
        growthStage: stage,
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, [petState.birthDate]);

  // Actions
  const feedPet = () => {
    if (petState.activity === "sleeping") return;

    setPetState((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        hunger: Math.min(100, prev.stats.hunger + 20),
        energy: Math.min(100, prev.stats.energy + 5),
        health: Math.min(100, prev.stats.health + 3),
        bond: Math.min(100, prev.stats.bond + 1),
      },
      activity: "eating",
      lastInteraction: Date.now(),
    }));

    setActivityLog((log) => ({ ...log, feed: log.feed + 1 }));

    setTimeout(() => {
      setPetState((prev) => ({
        ...prev,
        activity: null,
      }));
    }, 3000);
  };

  const playWithPet = () => {
    if (petState.activity === "sleeping") return;

    setPetState((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        happiness: Math.min(100, prev.stats.happiness + 25),
        energy: Math.max(0, prev.stats.energy - 15),
        hunger: Math.max(0, prev.stats.hunger - 10),
        bond: Math.min(100, prev.stats.bond + 3),
        health: Math.min(100, prev.stats.health + 2),
      },
      activity: "playing",
      lastInteraction: Date.now(),
    }));

    setActivityLog((log) => ({ ...log, play: log.play + 1 }));

    setTimeout(() => {
      setPetState((prev) => ({ ...prev, activity: null }));
    }, 3000);
  };

  const cleanPet = () => {
    if (petState.activity === "sleeping") return;

    setPetState((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        cleanliness: 100,
        happiness: Math.max(0, prev.stats.happiness - 5),
        health: Math.min(100, prev.stats.health + 4),
      },
      activity: "cleaning",
      lastInteraction: Date.now(),
    }));

    setActivityLog((log) => ({ ...log, clean: log.clean + 1 }));

    setTimeout(() => {
      setPetState((prev) => ({ ...prev, activity: null }));
    }, 3000);
  };

  const toggleSleep = () => {
    if (petState.activity === "sleeping") {
      setPetState((prev) => ({
        ...prev,
        activity: null,
        lastInteraction: Date.now(),
      }));
    } else {
      setPetState((prev) => ({
        ...prev,
        activity: "sleeping",
        lastInteraction: Date.now(),
      }));

      const sleepInterval = setInterval(() => {
        setPetState((prev) => {
          if (prev.activity !== "sleeping") {
            clearInterval(sleepInterval);
            return prev;
          }
          return {
            ...prev,
            stats: {
              ...prev.stats,
              health: Math.min(100, prev.stats.health + 1),
              energy: Math.min(100, prev.stats.energy + 5),
            },
          };
        });
      }, 3000);
    }
  };

  // Achievements hook (placed after state is defined)
  const { unlocked, notification } = useAchievements(petState, activityLog);

  return {
    petState,
    feedPet,
    playWithPet,
    cleanPet,
    toggleSleep,
    unlockedAchievements: unlocked,
    achievementNotification: notification,
  };
}
