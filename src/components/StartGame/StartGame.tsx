import React from "react";
import styles from "./startGame.module.css";
import Button from "../button/button";

interface Props {
  handleStart: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const StartGame: React.FC<Props> = ({ handleStart, setUsername }) => {
  return (
    <div className="container">
      <div id="holder">
        <label className={styles.label}>Enter your name</label>
        <input
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button text="Start Game!" onClick={handleStart} />
      </div>
    </div>
  );
};
export default StartGame;
