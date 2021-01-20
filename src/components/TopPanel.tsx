import React, { useEffect } from 'react'
import { GameProgress } from '../globals'
import { useGameContext } from '../contexts'
import './TopPanel.scss'

export default function TopPanel() {
  const { gameProgress } = useGameContext()
  const [time, setTime] = React.useState(0)

  useEffect(() => {
    if (gameProgress === GameProgress.NewGame) setTime(0)
    if (gameProgress === GameProgress.InProgress) {
      const interval = setInterval(() => setTime(time + 1), 1000)
      return () => clearInterval(interval)
    }
  })
  
  return (
    <>
      <div data-testid='topPanel'>
        <Avatar gameProgress={gameProgress}/>
        <div>Timer: <span data-testid='timer'>{time}</span></div>
      </div>
    </>
  )
}

function Avatar({gameProgress} : { gameProgress: GameProgress}) {
  let { rightClickHeldDown } = useGameContext()
  let avatarUrl

  if (rightClickHeldDown) {
    avatarUrl = "/images/retro/avatar/wow.png"
  } else {
    switch(gameProgress) {
      case GameProgress.Won:
        avatarUrl = "/images/retro/avatar/happy.png"
        break
      case GameProgress.Lost:
        avatarUrl = "/images/retro/avatar/sad.png"
        break
      default:
        avatarUrl = "/images/retro/avatar/angry.png"
        break
    }
  }

  return(
    <>
      <p>Avatar</p>
      <img id="avatar" src={avatarUrl} alt=""/>
    </>
  )
}
