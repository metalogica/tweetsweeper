import './Board.scss'
import { useState, useEffect } from 'react'
import { BoardState, CellState } from '../globals'
import { useSettings } from '../contexts'
import Cell from './Cell'

function Board({gameProgress, boardSize, numberOfMines, mineMap} : BoardState ) { 
  const [ grid, setGrid ] = useState(buildBoard({boardSize, numberOfMines, mineMap}))

  useEffect(() => {
    setGrid(buildBoard({boardSize, numberOfMines, mineMap}))
  }, [boardSize, gameProgress, numberOfMines, mineMap])

  const { state: { difficulty } } = useSettings()

  return (
    <div data-testid='board' className='board-container' id={difficulty}>
      { 
        grid.map((column: any) => {
          return (column.map((cellState: CellState, rowIndex: number) => { 
            cellState.setGrid = updateBoard
            return (<Cell key={rowIndex} {...cellState}/>)
          }))
        })
      }
    </div>
  )
}

function buildBoard(
  {
    boardSize, 
    numberOfMines,
    mineMap
  } : 
  { 
      boardSize: number, 
      numberOfMines: number, 
      mineMap: [number, number][]
  }
) 
{
  if (numberOfMines > 0 && (mineMap[0][0] !== -1 || mineMap[0][1] !== -1 )) { 
    throw new Error('Please EITHER set Random Mines via `numberOfMines` or use a `mineMap` to manually build mines on the grid.')
  }
  
  // Build the grid and populate it with CellStates
  const grid: [any[], any[]] = [[],[]]
  let mineCount: number = 0

  for (let j = 0; j < boardSize; j++) {
    // build new row
    if (grid[j] === undefined) grid.push([])

    for (let i = 0; i < boardSize; i++) {
      // build new column
      if (grid[j][i] === undefined) grid[j].push([])

      // set mines according to user defined `MineMap`; used specifically in test case in Board.test.tsx
      const mine = mineMap.find(cell => cell[0] === j && cell[1] === i)

      const cellState: CellState = {
        location: [j, i],
        clicked: false,
        mine: mine ? true : false,
        flagged: false,
        neighbors: 0
      }

      grid[j][i] = cellState
    }
  }

  // randomly select cells from grid to turn into mines
  // will only run if no `mineMap` has been provided
  while (mineCount < numberOfMines) {
    let randomRow = Math.ceil(Math.random() * (grid.length - 1))
    let randomCol = Math.ceil(Math.random() * (grid[0].length - 1))
    let randomMine = grid[randomRow][randomCol]

    if (!randomMine.mine) { 
      randomMine.mine = true 
      mineCount += 1
    }
  }

  return grid
}

function updateBoard(j: number, i: number) {
  console.log(j, i)
}

export default Board
