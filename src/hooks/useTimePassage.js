import { useEffect } from "react";

// This is to safely decrease a value but not below 0
const decrease = (value, amount) => Math.max(0, value - amount);

export default function useTimePassage(petState, setPetState) {
  useEffect(() => {
    const interval = setInterval(() => {
      setPetState((prev) => {
        const { stats, activity } = prev;

        if (activity === "sleeping") return prev; // skip decay

        const newStats = {
          ...stats,
          hunger: decrease(stats.hunger, 3),
          energy: decrease(stats.energy, 2),
          happiness: decrease(stats.happiness, 2),
          health:
            stats.hunger < 20 || stats.cleanliness < 20
              ? decrease(stats.health, 4)
              : stats.health,
          cleanliness: decrease(stats.cleanliness, 2),
          bond: decrease(stats.bond, 1),
        };

        return {
          ...prev,
          stats: newStats,
        };
      });
    }, 5000); 

    return () => clearInterval(interval); // cleanup
  }, [setPetState]);
}
