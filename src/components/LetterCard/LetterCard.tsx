import React from "react";
import styles from "./letterCard.module.css";
import { LetterPoint } from "../../types/types";

const LetterCard: React.FC<LetterPoint> = ({ letter, score, multiplier }) => {
  return <div className={styles.container}>
    {letter}
    </div>;
};

export default LetterCard;
