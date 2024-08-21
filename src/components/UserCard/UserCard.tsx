import React from "react";
import styles from "./userCard.module.css";
import { User } from "../../providers/Provider";
import Icon from "../../assets/user.png";

const UserCard: React.FC<User> = ({ username, id, score, winner }) => {
  return (
    <div className={`${styles.container}`}>
      <img src={Icon} className={styles.image} />
      <div className="content">
        <p className={styles.name}>{username}</p>
        <p className={styles.score}>Score: <span> {score} </span> </p>
      </div>
    </div>
  );
};

export default UserCard;
