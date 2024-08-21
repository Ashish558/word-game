import React, { useContext } from "react";
import styles from "./users.module.css";
import { GameContext, GameContextProps, User } from "../../providers/Provider";
import UserCard from "../UserCard/UserCard";

export default function Users() {
  const { users } = useContext(GameContext) as GameContextProps;

  return (
    <div className={styles.container} >
      {users.map((user: User) => {
        return <UserCard {...user} key={user.id} />;
      })}
    </div>
  );
}
