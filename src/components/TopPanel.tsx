import React, { useEffect } from 'react'
import { GameProgress } from '../globals'
import { useGameContext } from '../contexts'

export default function TopPanel() {
  const { gameProgress, difficulty } = useGameContext()
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
        <Avatar/>
        <div>Timer: <span data-testid='timer'>{time}</span></div>
      </div>
    </>
  )
}

function Avatar() {
  return(
    <>
      <p>Avatar</p>
      <img src="" alt=""/>
    </>
  )
}
