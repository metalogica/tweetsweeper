import { useState } from 'react'
import './Board.scss'
import { BoardState, CellState } from '../globals'
import Cell from './Cell'

function Board({gameProgress, boardSize, numberOfMines} : BoardState ) { 
  const grid = buildBoard(boardSize, numberOfMines)

  return (
    <div data-testid='board' className='board-container'>
      { 
        grid.map((column: any) => {
          return (column.map((cellState: CellState, rowIndex: number) => {
            return (<Cell key={rowIndex} {...cellState}/>)
          }))
        }) 
      }
    </div>
  )
}

function buildBoard(boardSize: number, numberOfMines: number) {
  const grid: [any[], any[]] = [[],[]]
  const mineCount: number = 0

  function buildMine(mineCount: number, maxMines: number) {
    if (mineCount === maxMines) { return false }

    return Math.random() > 0.5 ? true : false
  }

  for (let j = 0; j < boardSize; j++) {
    // build new row
    if (grid[j] === undefined) grid.push([])

    for (let i = 0; i < boardSize; i++) {
      // build new column
      if (grid[j][i] === undefined) grid[j].push([])

      const cellState: CellState = {
        location: [j, i],
        clicked: false,
        mine: buildMine(mineCount, numberOfMines),
        flagged: false,
        neighbors: 0
      }

      grid[j][i] = cellState
    }
  }

  return grid
}

export default Board
