import React, { useState } from 'react'

function Toolbar(props: any) {
  const [revealed, setRevealed] = useState<boolean>(false)

  return (
    <div className='toolbar-container' onClick={() => setRevealed(!revealed)}>
      <span className='toolbar-icon'></span>
      {
        revealed && (
          <>
            <li>One</li>
            <li>Two</li>  
            <li>Three</li>
          </>
        )
      }
    </div>
  )
}

export default Toolbar
