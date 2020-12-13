/** @jsxImportSource @emotion/react */
// import { jsx } from '@emotion/react'
import { useState } from 'react'
import Cell from './Cell'
import { useSettings, Difficulty } from '../contexts'
import { BoardState, CellState } from '../globals'
import './Board.scss'

function Board() { 
  const { state: { difficulty } } = useSettings();
  const [ newGame, setNewGame ] = useState<boolean>(true)

  return (
    <div className='board-container'>
      Hello from the board component!!!
      {
        difficulty === Difficulty.Easy && (<><Cell className='easy'>easy</Cell><Cell className='easy'>easy</Cell></>)
      }
      {
        difficulty === Difficulty.Regular && (<Cell className='regular'>regular</Cell>)
      }
      {
        difficulty === Difficulty.Hard && (<Cell className='hard'>hard</Cell>)
      }
    </div>
  )
}

export default Board
