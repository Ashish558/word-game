import React, { useEffect } from "react";
import styles from "./game.module.css";
import Socket from "../utils/Socket";
import { GameContext, GameContextProps } from "../providers/Provider";
import Loader from "../components/Loader/Loader";
import SelectLetters from "../components/SelectLetters/SelectLetters";
import Users from "../components/users/users";
import Timer from "../components/Timer/Timer";
import Winners from "../components/Winners/winners";
import GameEnd from "../components/GameEnd/GameEnd";

export default function Game() {
  const {
    gameStarted,
    round,
    roundEnded,
    showScores,
    currentRoundScore,
    gameEnded,
  } = React.useContext(GameContext) as GameContextProps;
  // useEffect(() => {
  //    Socket.initializeSocket()
  // }, [])


  if (!gameStarted) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }
  if (gameEnded) {
    return (
      <GameEnd />
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.round}>
          <p className={styles.text}>Round {round.roundNumber}</p>
        </div>
        <Timer />
      </div>
      {roundEnded ? (
        <div className={styles["round-end-container"]}>
          <p>Round has Ended Calculating scores...</p>
        </div>
      ) : showScores ? (
        <div className={styles["score-container"]}>
          Your score is {currentRoundScore}
        </div>
      ) : (
        <SelectLetters />
      )}
      <Users />
    </div>
  );
}
