/** @jsxImportSource @emotion/react */

import React, { useContext } from 'react'
import { GameOptionsContext } from '../App'
import { jsx } from '@emotion/react'
import './Board.scss'

function Board() { 
  const { difficulty, opponent, theme } = useContext(GameOptionsContext)

  return (
    <div>
      Hello from the board component!!!
      <p>Difficulty: {difficulty}</p>
      <p>opponent: {opponent}</p>
      <p>theme: {theme}</p>
    </div>
  )
}

export default Board
