/** @jsxImportSource @emotion/react */
// import { jsx } from '@emotion/react'
import Cell from './Cell'
import { useSettings } from '../contexts'
import './Board.scss'

function Board() { 
  const { state: { difficulty } } = useSettings();

  return (
    <div className='board-container'>
      Hello from the board component!!!
      {difficulty}
      <Cell/>
      <Cell/>
      <Cell/>
      <Cell/>
    </div>
  )
}

export default Board
