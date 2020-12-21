import _ from 'lodash'
import { useState, useEffect } from 'react'
import './Board.scss'
import Cell from './Cell'
import { useSettings } from '../contexts'
import { 
  BoardState, 
  CellState,
  setCellStyle
} 
from '../globals'

const Board: React.FC<BoardState> = ({gameProgress, boardSize, numberOfMines, mineMap} : BoardState ) => { 
  // TODO: Refactor this enum to remove redundant `state` key
  const { state: { difficulty } } = useSettings()

  const [ grid, setGrid ] = useState(buildBoard({boardSize, numberOfMines, mineMap}))

  useEffect(() => {
    setGrid(buildBoard({boardSize, numberOfMines, mineMap}))
  }, [boardSize, gameProgress, numberOfMines, mineMap])
  
  
  // TODO: rebuild this functionality with useContext and/or useRef()
  // https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/
  // assumption was to 'optimize' React.render by doing in-place modification of `grid` rather than re-drawing the 
  // entire board after each click. I guess I have to do the naive thing and re-render the board each time...
  function updateBoard(j: number, i: number) {
    const updatedGrid: [any[], any[]] = _.cloneDeep(grid)

    const cell = updatedGrid[j][i]
    cell.style = setCellStyle(cell)
    cell.clicked = true

    setGrid(updatedGrid)
  }

  console.log(grid)

  return (
    <div data-testid='board' className='board-container' id={difficulty}>
      { 
        grid.map((column: any) => {
          return (column.map((cellState: CellState, rowIndex: number) => { 
            // pass updateBoard() function to each child cell; on game boot up the grid is empty 
            // and so this function is nil, that is why we assign it here. 
            cellState.updateBoard = updateBoard
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
  const userDesiresRandomMineGeneration = numberOfMines > 0
  const userDoesNotDesireRandomMineGeneration = mineMap[0][0] !== -1 || mineMap[0][1] !== -1 

  if (userDesiresRandomMineGeneration && userDoesNotDesireRandomMineGeneration) { 
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

      cellState.style = setCellStyle(cellState)
      grid[j][i] = cellState
    }
  }

  // randomly select cells from grid to turn into mines;
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

  // TODO Build logic to set the correct number of neighbors
  return grid
}

export default Board
