import { useState } from 'react'
import Cell from './Cell'
import { useSettings, Difficulty } from '../contexts'
import { BoardState } from '../globals'
import './Board.scss'

function Board({gameProgress, boardSize, numberOfMines} : BoardState ) { 
  return (
    <div data-testid='board' className='board-container'>
      Hello from the board component!!!
    </div>
  )
}

export default Board
