import React, { useEffect, useRef, useState } from "react";
import Socket from "../utils/Socket";
import { LetterPoint } from "../types/types";

interface ProviderProps {
  username: string;
  //   exitGame: () => void;
  children: any;
}

export type User = {
  id: string;
  score: number;
  username: string;
  winner?: boolean;
};

export type Round = {
  timer: number;
  letters: LetterPoint[];
  roundNumber: number;
  userScores: Record<string, number>;
};

export interface GameContextProps {
  users: User[];
  gameStarted: boolean;
  round: Round;
  items: LetterPoint[][];
  setItems: (items: LetterPoint[][]) => void;
  roundEnded: boolean;
  showScores: boolean;
  gameEnded: boolean;
  currentRoundScore: number;
  disconnect: () => void
}

export const GameContext = React.createContext<Partial<GameContextProps>>({});

const GameProvider: React.FC<ProviderProps> = (props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<LetterPoint[][]>([]);
  const socket = Socket.getSocket();
  const [gameStarted, setGameStarted] = useState(false);
  const [roundEnded, setRoundEnded] = useState<boolean>(false);
  const [showScores, setShowScores] = useState<boolean>(false);
  const [currentRoundScore, setCurrentRoundScore] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const [round, setRound] = useState<Round>({
    timer: 0,
    letters: [],
    roundNumber: 1,
    userScores: {},
  });

  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    socket.on("gameStart", (data): void => {
      setGameStarted(true);
      setUsers(data.users);
      console.log("game start", data);
    });

    socket.on("roundStart", (data): void => {
      console.log("round start", data);
      // let roundData = data
      setRoundEnded(false);
      setShowScores(false);
      // roundData.letters = round.letters.map((item, index) => ({...item, id: index}))
      setRound(data);
    });
    socket.on("gameEnd", (data): void => {
      console.log("gameEnd");
      setGameEnded(true);
    });
    socket.on("getRoundScore", (data): void => {
      console.log('getRoundScore', data);
      setCurrentRoundScore(data.score)
    });
  }, []);

  useEffect(() => {
    socket.on("roundEnd", (data): void => {
      console.log("round end", data);
      socket.emit(
        "submitWord",
        itemsRef.current[0].map((item) => item.letter)
      );
      setRoundEnded(true);
    });
  }, []);

  useEffect(() => {
    socket.on("getScores", (data): void => {
      console.log("getScores", data);
      setShowScores(true);
      setRoundEnded(false);
      setUsers(data);
      // socket.emit('submitWord', itemsRef.current[0].map(item => item.letter));
    });
  }, []);

  const disconnect = () => {
    socket.disconnect()
  }
  // useEffect(() => {
  //   users.map((user) => {
  //     if (user.id === socket.id) {
  //       setCurrentRoundScore(user.score);
  //     }
  //   });
  // }, [users, socket.id]);

  return (
    <GameContext.Provider
      value={{
        users,
        gameStarted,
        round,
        items,
        setItems,
        roundEnded,
        showScores,
        currentRoundScore,
        gameEnded,
        disconnect
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
