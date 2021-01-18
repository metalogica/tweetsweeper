import React, { useEffect } from 'react'
import { GameProgress } from '../globals'
import { useGameContext } from '../contexts'

export default function TopPanel() {
  const { gameProgress } = useGameContext()
  const [time, setTime] = React.useState(0)

  useEffect(() => {
    if (gameProgress === GameProgress.InProgress) {
      const interval = setInterval(() => setTime(time + 1), 1000)
      return () => clearInterval(interval)
    }
  }, [time, gameProgress])
  
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
