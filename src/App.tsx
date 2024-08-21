import React, { useState } from "react";
import "./App.css";
import GameProvider from "./providers/Provider";
import styles from "./app.module.css";
import Button from "./components/button/button";
import Game from "./game/game";
import StartGame from "./components/StartGame/StartGame";
import Socket from "./utils/Socket";
import Home from "./pages/Home";

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const handleStart = () => {
    setGameStarted(true);
    console.log('username', username);
    Socket.initializeSocket(username)
  }

  if (gameStarted === false) {
    return (
      <StartGame
        handleStart={handleStart}
        setUsername={setUsername}
      />
    );
  }
  return (
    <GameProvider username={username}>
      <Home />
    </GameProvider>
  );
}

export default App;
