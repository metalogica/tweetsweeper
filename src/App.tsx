import React, { useContext } from 'react';
import Board from './components/Board'
import Toolbar from './components/Toolbar'
import './App.scss';

interface GameOptions {
  difficulty: string;
  theme: string;
  opponent: string
}

const gameOptionsDefaultData: GameOptions = {
  difficulty: 'easy',
  theme: 'retro',
  opponent: 'trump'
}

export const GameOptionsContext = React.createContext<GameOptions>(gameOptionsDefaultData)

function App() {
  return (
    <>
      <GameOptionsContext.Provider value={gameOptionsDefaultData}>
        <Board/>
        <Toolbar/>
      </GameOptionsContext.Provider>
    </>
  )
}

export default App;
