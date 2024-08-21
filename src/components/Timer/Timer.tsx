import React, { useContext, useEffect, useState } from "react";
import styles from "./timer.module.css";
import { GameContext, GameContextProps } from "../../providers/Provider";

export default function Timer() {
  const { round } = useContext(GameContext) as GameContextProps;
  const [timer, setTimer] = useState<number>(0);
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    // Set the initial timer value in seconds
    const initialTime = Math.floor(round.timer / 1000);
    setTimer(initialTime);
    setProgress(100); // Reset progress to 100%

    // Update the timer and progress every second
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          const newTimer = prevTimer - 1;
          setProgress((newTimer / initialTime) * 100);
          return newTimer;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    console.log('roundtimer', round.timer);
    // Cleanup interval on dependency change or component unmount
    return () => clearInterval(interval);
  }, [round.timer, round.roundNumber]); // Depend on round.timer to restart the timer

  return (
    <div className={styles.circle}>
      <p className={styles.text}>{timer}</p>
    </div>
  );
}
