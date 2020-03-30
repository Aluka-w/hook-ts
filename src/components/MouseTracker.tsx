import React, { useEffect, useState } from 'react'

const MouseTracker: React.FC = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 })
  const updatMouse = React.useCallback(
    (e: MouseEvent) => {
      console.log('inner')
      setPositions({ x: e.clientX, y: e.clientY })
    },
    [positions]
  )
  useEffect(() => {
    console.log('add effect', positions.x)
    document.addEventListener('click', updatMouse)
    return () => {
      console.log('remove effect', positions.x)
      document.removeEventListener('click', updatMouse)
    }
  }, [updatMouse])
  console.log('render', positions.x)
  return (
    <div>
      <p>
        X: {positions.x}
        Y: {positions.y}
      </p>
    </div>
  )
}

export default MouseTracker
