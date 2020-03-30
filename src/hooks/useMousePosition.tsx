import { useEffect, useState } from 'react'
const useMousePosition = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 })
  useEffect(() => {
    console.log('add effect', positions.x);
    const updatMouse = (e: MouseEvent) => {
      // console.log('inner')
      setPositions({ x: e.clientX, y: e.clientY })
    }
    document.addEventListener('mousemove', updatMouse)
    return () => {
      console.log('remove effect', positions.x);
      document.removeEventListener('mousemove', updatMouse)
    }
  }, [])
  return positions
}

export default useMousePosition
