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

    // cell is a mine
    if (cell.mine) { 
      for (let row = 0; row < boardSize; row ++) {
        for (let col = 0; col < boardSize; col ++) {
          updatedGrid[row][col].clicked = true
        }
      }

      setGrid(updatedGrid)
    }

    // recursively open all blank cells
    let stack: any = []
    stack.push(cell)

    while (stack.length > 0) {
      const currentCell = stack.shift()

      if (!currentCell.mine && !currentCell.clicked) {
        currentCell.clicked = true
        currentCell.style = setCellStyle(cell)
      }

      if (currentCell.neighbors === 0) {
        const j = currentCell.location[0]
        const i = currentCell.location[1]
  
        let neighborCell = updatedGrid[j-1] && updatedGrid[j-1][i-1] && !updatedGrid[j-1][i-1].mine && !updatedGrid[j-1][i-1].clicked //&& updatedGrid[j-1][i-1].neighbors === 0 // top left
        if (neighborCell) stack.push(updatedGrid[j-1][i-1])
        neighborCell = updatedGrid[j-1] && updatedGrid[j-1][i] && !updatedGrid[j-1][i].mine && !updatedGrid[j-1][i].clicked //&& updatedGrid[j-1][i].neighbors === 0 // top 
        if (neighborCell) stack.push(updatedGrid[j-1][i])
        neighborCell = updatedGrid[j-1] && updatedGrid[j-1][i+1] && !updatedGrid[j-1][i+1].mine && !updatedGrid[j-1][i+1].clicked //&& updatedGrid[j-1][i+1].neighbors === 0 // top right
        if (neighborCell) stack.push(updatedGrid[j-1][i+1])
        neighborCell = updatedGrid[j] && updatedGrid[j][i-1] && !updatedGrid[j][i-1].mine && !updatedGrid[j][i-1].clicked //&& updatedGrid[j][i-1].neighbors === 0 // left
        if (neighborCell) stack.push(updatedGrid[j][i-1])
        neighborCell = updatedGrid[j] && updatedGrid[j][i+1] && !updatedGrid[j][i+1].mine && !updatedGrid[j][i+1].clicked //&& updatedGrid[j][i+1].neighbors === 0 //right
        if (neighborCell) stack.push(updatedGrid[j][i+1])
        neighborCell = updatedGrid[j+1] && updatedGrid[j+1][i-1] && !updatedGrid[j+1][i-1].mine && !updatedGrid[j+1][i-1].clicked //&& updatedGrid[j+1][i-1].neighbors === 0 //bottom right
        if (neighborCell) stack.push(updatedGrid[j+1][i-1])
        neighborCell = updatedGrid[j+1] && updatedGrid[j+1][i] && !updatedGrid[j+1][i].mine && !updatedGrid[j+1][i].clicked //&& updatedGrid[j+1][i].neighbors === 0 // bottom
        if (neighborCell) stack.push(updatedGrid[j+1][i])
        neighborCell = updatedGrid[j+1] && updatedGrid[j+1][i+1] && !updatedGrid[j+1][i+1].mine && !updatedGrid[j+1][i+1].clicked //&& updatedGrid[j+1][i+1].neighbors === 0 // bottom right
        if (neighborCell) stack.push(updatedGrid[j+1][i+1])
      }
    }

    setGrid(updatedGrid)
  }

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
  
  // Build the empty grid
  const grid: [any[], any[]] = [[],[]]
  for (let j = 0; j < boardSize; j++) {
    if (grid[j] === undefined) grid.push([])
    for (let i = 0; i < boardSize; i++) {
      if (grid[j][i] === undefined) grid[j].push([])
    }
  }

  // randomly select cells from grid to turn into mines;
  // will only run if no `mineMap` has been provided
  let mineCount: number = 0

  while (mineCount < numberOfMines) {
    let randomRow = Math.ceil(Math.random() * (grid.length - 1))
    let randomCol = Math.ceil(Math.random() * (grid[0].length - 1))
    let cell = grid[randomRow][randomCol]

    if (!cell.includes('mine')) { 
      cell.push('mine')
      mineCount += 1
    }
  }

  // populate the grid with cells
  for (let j = 0; j < boardSize; j++) {
    for (let i = 0; i < boardSize; i++) {
      // set mines according to user defined `MineMap`; used specifically in test case in Board.test.tsx OR set random mines
      const mine = mineMap.find(cell => cell[0] === j && cell[1] === i) || grid[j][i][0] === 'mine'

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

  // build neighbors
  for (let j = 0; j < boardSize; j++) {
    for (let i = 0; i < boardSize; i ++) {
      let neighbors = 0

      const topLeft = grid[j-1] && grid[j-1][i-1] && grid[j-1][i-1].mine // top left
      if (topLeft) neighbors += 1
      const top = grid[j-1] && grid[j-1][i] && grid[j-1][i].mine // top 
      if (top) neighbors += 1
      const topRight = grid[j-1] && grid[j-1][i+1] && grid[j-1][i+1].mine // top right
      if (topRight) neighbors += 1
      const left = grid[j] && grid[j][i-1] && grid[j][i-1].mine // left
      if (left) neighbors += 1
      const right = grid[j] && grid[j][i+1] && grid[j][i+1].mine //right
      if (right) neighbors += 1
      const bottomLeft = grid[j+1] && grid[j+1][i-1] && grid[j+1][i-1].mine //bottom right
      if (bottomLeft) neighbors += 1
      const bottom = grid[j+1] && grid[j+1][i] && grid[j+1][i].mine // bottom
      if (bottom) neighbors += 1
      const bottomRight = grid[j+1] && grid[j+1][i+1] && grid[j+1][i+1].mine // bottom right
      if (bottomRight) neighbors += 1

      grid[j][i].neighbors = neighbors
    }
  }

  return grid
}

export default Board
