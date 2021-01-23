import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import App from '../App'
import Board from './Board'
import { testBoardState } from "../globals"

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


describe('ModalCompletion', () => {
  beforeEach(() => render(<App/>))

  it('should not load the modal when a game is ongoing', () => {
    const modal = screen.queryByTestId("modal-completion")

    expect(modal).toBeNull()
  })

  it('should load a Success message', async () => {
    const gameWon = await winGame()
    expect(gameWon).toBe(true)

    const modal = screen.getByTestId('modal-completion')
    expect(modal).toBeInTheDocument()
  })
  
  it('should load a Failure message', async () => {
    const gameLost = await failGame()
    expect(gameLost).toBe(true)

    const modal = screen.getByTestId('modal-completion')
    expect(modal).toBeInTheDocument()
  })

  it('should allow the user to restart the game', () => {

  })
})
