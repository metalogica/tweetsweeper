import React, { useContext } from 'react';
import Board from './components/Board'
import Toolbar from './components/Toolbar'
import './App.scss';

interface Game {
  difficulty: string;
  theme: string;
  opponent: string;
  options: Options
}

interface Options {
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
  }
}

export const GameContext = React.createContext<Game>(gameDefaultData)

function App() {
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
