import { screen, fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TopPanel from './TopPanel'
import Board from './Board'
import Toolbar from './Toolbar'
import App from '../App'
import { testBoardState } from '../globals'

// shared examples
function toggleNewGameAndDifficulty(difficulty: string) {
  const toolbarToggler = screen.getByTestId('toolbar-toggler')
  fireEvent.click(toolbarToggler)
  
  const difficultySelect = screen.getByLabelText('difficulty')
  fireEvent.click(difficultySelect, { name: difficulty})
}

describe('Basic Functions', () => {
  beforeEach(()=>{
    render(<TopPanel/>)
    render(<Toolbar/>)
  })

  describe('Timer', () => {
    it('should report the time played during the game to the user', () => {
      const timer = screen.getByTestId('timer')
      expect(timer).toBeInTheDocument()
    })
    
    it('should not start counting if the user has not clicked on a cell, or has not flagged a cell', () => {
      const timer = screen.getByTestId('timer')
      expect(timer).toBeInTheDocument()
      let time =  Number(timer.textContent)

      expect(time).toEqual(0)
    })

    it('should start counting if the user clicks on a blank cell', () => {
      render(<Board {...testBoardState}/>)

      const timer = screen.getByTestId('timer')
      expect(timer).toBeInTheDocument()
      const cell = screen.getByTestId('0-0')
      fireEvent.click(cell)

      setTimeout(() => {
        let time = Number(timer.textContent)

        expect(time).toBeGreaterThan(0)
      }, 1500)
    })

    it('should reset the counter if the game is restarted', () => {
      render(<Board {...testBoardState}/>)

      const timer = screen.getByTestId('timer')
      expect(timer).toBeInTheDocument()

      const cell = screen.getByTestId('0-0')
      fireEvent.click(cell)

      let time
      setTimeout(()=>{
        time = Number(timer.textContent)
        expect(time).toBeGreaterThan(0)
      }, 1500)

      toggleNewGameAndDifficulty('regular')

      time = Number(timer.textContent)
      expect(time).toEqual(0)
    })  

    it('should start counting if the user flags a cell', () => {
      render(<Board {...testBoardState}/>)

      const timer = screen.getByTestId('timer')
      expect(timer).toBeInTheDocument()
      const earlierTime = Number(timer.textContent)

      const cell = screen.getByTestId('0-0')
      fireEvent.contextMenu(cell)

      setTimeout(() => {
        const laterTime = Number(timer.textContent)

        console.log(earlierTime, laterTime)
        expect(earlierTime).toBeLessThan(laterTime)
        expect(true).toEqual(false)
      }, 1500)
    })

    it('should stop counting if the game ends', () => {
      render(<Board {...testBoardState}/>)

      const timer = screen.getByTestId('timer')
      expect(timer).toBeInTheDocument()
      const mineCell = screen.getByTestId('3-2')
      fireEvent.click(mineCell)

      let earlierTime = Number(timer.textContent)

      setTimeout(() => {
        const laterTime = Number(timer.textContent)

        expect(earlierTime).toEqual(laterTime)
      }, 1500)
    })
  })

  describe('Avatar', () => {
    test('clicking it restarts the game', () => {

    })
  })

  describe('Flag Count', () => {
    it('should keep track of the current number of flags', () => {

    })

    it('should reset the flag count if the game ends', () => {

    })
  })
})
