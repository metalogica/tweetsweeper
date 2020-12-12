import React, { useContext, useEffect } from 'react';
import Board from './components/Board'
import Toolbar from './components/Toolbar'
import './App.scss';

interface Game {
  difficulty: string;
  theme: string;
  opponent: string;
  options: Options;
  setOptions: () => void
}

export interface Options {
  difficulty: string[];
  theme: string[];
  opponent: string[];
}

const gameDefaultData: Game = {
  difficulty: 'easy',
  theme: 'retro',
  opponent: 'trump',
  options: {
    difficulty: ['easy', 'medium', 'difficult'],
    theme: ['retro', 'dark'],
    opponent: ['trump', 'biden']
  },
  setOptions: () => {console.log('context function')}
}

export const GameContext = React.createContext<Game>({
  ...gameDefaultData
})

function App() {
  const [difficulty, setDifficulty] = React.useState<string>(gameDefaultData.difficulty)

  const updateGame = (difficulty: string) => {
    setDifficulty(difficulty)
  }

  return (
    <>
      <GameContext.Provider value={gameDefaultData}>
        <Board/>
        <Toolbar/>
      </GameContext.Provider>
    </>
  )
}

export default App;
