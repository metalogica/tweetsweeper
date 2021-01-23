import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import ModalCompletion from './ModalCompletion'

describe('ModalCompletion', () => {
  beforeEach(() => render(<ModalCompletion/>))

  it('should not load when a game is present', () => {
    const modal = screen.getByTestId('modal-completion')

    expect(modal).not.toBeInTheDocument()
  })

  it('should load a Success message', () => {
    const modal = screen.getByText("Congratulations! You trumped Trumped lies! Play Again?")

    expect(modal).toBeInTheDocument()
  })

  it('should load a Failure message', () => {
    const modal = screen.getByText("Dangit! Trump triumphed! Play again?")

    expect(modal).toBeInTheDocument()
  })
})
