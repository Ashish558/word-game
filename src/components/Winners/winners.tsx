import React, { useContext } from "react";
import styles from "./users.module.css";
import { GameContext, GameContextProps, User } from "../../providers/Provider";
import UserCard from "../UserCard/UserCard";

export default function Winners() {
  const { users } = useContext(GameContext) as GameContextProps;

  return (
    <div className={styles.container} >
      {users.sort((a, b) => b.score - a.score).map((user: User, index) => {
        return <UserCard {...user} key={user.id} winner={index === 0 ? true : false} />;
      })}
    </div>
  );
}
