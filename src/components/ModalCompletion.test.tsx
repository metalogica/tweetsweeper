import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { BoardState, completedTestBoardState,  } from '../globals'
import ModalCompletion from "./ModalCompletion"

async function failGame() {
  const cell = screen.getByTestId('2-1')
  fireEvent.click(cell)
  return true
}

async function winGame() {
  const mineCellOne = screen.getByTestId('2-1')
  const mineCellTwo = screen.getByTestId('3-2')

  fireEvent.contextMenu(mineCellOne)
  fireEvent.contextMenu(mineCellTwo)

  return true
}

function validateBoardRender(board: BoardState) {
  const gridLength = board.boardSize

  for (let row = 0; row < gridLength; row ++) {
    for (let col = 0; col < gridLength; col ++) {
      // expect the style of the actual grid matches the test spec grid
      let actualCell = screen.getByTestId(`${row}-${col}`)
      let expectedCell = board.grid[row][col]

      expect(actualCell.style.backgroundImage).toEqual(expectedCell.style.backgroundImage)
    }
  }

  return new Promise(()=> true)
}

describe('ModalCompletion', () => {
  beforeEach(() => render(<ModalCompletion/>))

  it('should not load the modal when a game is ongoing', () => {
    const modal = screen.queryByTestId("modal-completion")

    expect(modal).toBeNull()
  })

  it('should load a Success message', async () => {
    const gameWon = await winGame()
    expect(gameWon).toBe(true)
    const boardReRendered = await waitFor(() => expect(validateBoardRender(completedTestBoardState)).toHaveBeenCalledTimes(1))
    expect(boardReRendered).toEqual(true)

    const modal = await screen.findByTestId('modal-completion')
    expect(modal).toBeInTheDocument()
  })
  
  // TO DO: Submit ticket in React testing library about this.
  // https://github.com/testing-library/react-testing-library/issues/new/choose
  it('should load a Failure message', async () => {
    const gameLost = await failGame()
    expect(gameLost).toBe(true)

    interface MatcherOptions {
      timeout?: number
    }
    const options: MatcherOptions = {
      timeout: 9000
    }
    const modal = await screen.findByTestId('modal-completion', options)
    expect(modal).toBeInTheDocument()
  })

  it('should allow the user to restart the game', async () => {
    const restartButton = screen.getByTestId('restart-game-button')
    fireEvent.click(restartButton)
    const modal = screen.getByTestId("modal-completion")
    expect(modal).toBeNull()
  })
})
