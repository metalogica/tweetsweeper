import React, { useState } from 'react'

function Toolbar(props: any) {
  const [revealed, setRevealed] = useState<boolean>(false)

  return (
    <div className='toolbar-container'>
      <span className={revealed ? 'toolbar-icon revealed' : 'toolbar-icon'} onClick={() => setRevealed(!revealed)}></span>
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
