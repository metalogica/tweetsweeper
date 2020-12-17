import './Board.scss'
import { BoardState, CellState } from '../globals'
import { useSettings } from '../contexts'
import Cell from './Cell'

function Board({gameProgress, boardSize, numberOfMines, mineMap} : BoardState ) { 
  let grid = buildBoard({boardSize, numberOfMines, mineMap})
  console.log({})
  const { state: { difficulty } } = useSettings()

  return (
    <div data-testid='board' className='board-container' id={difficulty}>
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
    throw new Error('Please EITHER set Random Mines via `numberOfMines` or use a `mineMap` to manually build mines on the grid')
  }
  
  const grid: [any[], any[]] = [[],[]]
  let mineCount: number = 0

  for (let j = 0; j < boardSize; j++) {
    // build new row
    if (grid[j] === undefined) grid.push([])

    for (let i = 0; i < boardSize; i++) {
      // build new column
      if (grid[j][i] === undefined) grid[j].push([])

      const cellState: CellState = {
        location: [j, i],
        clicked: false,
        mine: randomMine(mineCount, numberOfMines),
        mine: false,
        flagged: false,
        neighbors: 0
      }

      grid[j][i] = cellState
    }
  }

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

export default Board
