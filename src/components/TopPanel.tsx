import React, { useEffect } from 'react'
import { GameProgress } from '../globals'
import { useGameContext } from '../contexts'
import './TopPanel.scss'

export default function TopPanel() {
  const { gameProgress, difficulty } = useGameContext()
  const [time, setTime] = React.useState(0)

  // countdown timer logic
  useEffect(() => {
    if (gameProgress === GameProgress.BeginNewGame) { 
      setTime(0) 
    }
    if (gameProgress === GameProgress.InProgress) {
      const interval = setInterval(() => setTime(time + 1), 1000)
      return () => clearInterval(interval)
    }
  }, [gameProgress, time])

  function handleStyle() {
    switch(difficulty) {
      case 'easy':
        return 'top-panel-container easy'
      case 'regular':
        return 'top-panel-container regular'
      case 'hard':
        return 'top-panel-container hard'
    }
  }
  
  return (
    <>
      <div data-testid='topPanel' className={handleStyle()}>
        <FlagCounter/>
        <Avatar gameProgress={gameProgress}/>
        <div className='timer-container'>Time Played: <span data-testid='timer'>{time}</span></div>
      </div>
    </>
  )
}

function FlagCounter() {
  const { flags, numberOfMines } = useGameContext()

  return(
    <div className='flag-counter-container'>
      <span>Mines Left:</span>
      { numberOfMines && <span data-testid="flag-counter">{numberOfMines - flags}</span> }
    </div>
  )
}

function Avatar({gameProgress} : { gameProgress: GameProgress}) {
  let { rightClickHeldDown } = useGameContext()
  let avatarUrl

  // avatar changes if user holds down left mouse button
  if (rightClickHeldDown) {
    avatarUrl = "/images/retro/avatar/wow-transparent.png"
  } else {
    // avatar changes according to game state
    switch(gameProgress) {
      case GameProgress.Won:
        avatarUrl = "/images/retro/avatar/sad-transparent.png"
        break
        case GameProgress.Lost:
        avatarUrl = "/images/retro/avatar/happy-transparent.png"
        break
      default:
        avatarUrl = "/images/retro/avatar/angry-transparent.png"
        break
    }
  }

  return(
    <div className='avatar-container'>
      <img data-testid="avatar" id="avatar" src={avatarUrl} alt=""/>
    </div>
  )
}
