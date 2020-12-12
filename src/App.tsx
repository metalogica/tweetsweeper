import React, { useContext, useEffect } from 'react';
import { GameStateContext, Difficulty } from './contexts'
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
  const [difficulty, setDifficulty] = React.useState(Difficulty.Easy)

  return (
    <>
      <GameStateContext.Provider value={{difficulty, setDifficulty}}>
        <GameContext.Provider value={gameDefaultData}>
          <h1>APP: </h1>
          Difficulty: {difficulty}
          <Board/>
          <Toolbar/>
        </GameContext.Provider>
      </GameStateContext.Provider>
    </>
  )
}

export default App;
