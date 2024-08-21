import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Winners from "../Winners/winners";
import { GameContext, GameContextProps, User } from "../../providers/Provider";
import Button from "../button/button";

export default function GameEnd() {
  const { users } = React.useContext(GameContext) as GameContextProps;
  const [winner, setWinner] = useState<User>();

  useEffect(() => {
    let highestScoreObj = users.reduce(
      (max: any, obj: any) => (obj.score > max.score ? obj : max),
      users[0]
    );
    setWinner(highestScoreObj);
    console.log("highestScoreObj", highestScoreObj);
  }, [users]);

  const handlePlayAgain = () => window.location.reload();

  return (
    <div className={styles["container"]}>
      <div>
        <p className={styles.text}>Game has Ended</p>
        <p className={styles.winner}> {winner?.username} is the winner! </p>
      </div>
      <Winners />
      <div className={styles.button} >
        <Button text="Play Again!" onClick={handlePlayAgain} />
      </div>
    </div>
  );
}
