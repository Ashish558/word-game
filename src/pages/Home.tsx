import React, { useContext } from 'react'
import { GameContext, GameContextProps } from '../providers/Provider';
import Game from '../game/game';

export default function Home() {
  const { gameEnded } = useContext(GameContext) as GameContextProps;
   

   return (
      <>
         <Game />
      </>
   )
}
