import React, { useContext } from 'react';
import Board from './components/Board'
import Toolbar from './components/Toolbar'
import './App.scss';

interface Game {
  difficulty: string;
  theme: string;
  opponent: string
}

const gameDefaultData: Game = {
  difficulty: 'easy',
  theme: 'retro',
  opponent: 'trump'
}

export const GameContext = React.createContext<Game>(gameDefaultData)

function App() {
  return (
    <>
      <Board/>
      <Toolbar/>
    </>
  )
}

export default App;
