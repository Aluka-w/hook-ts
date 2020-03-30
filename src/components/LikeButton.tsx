import React, { useEffect, useState, useRef } from 'react'
import { ThemesContext } from '../context'

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(false)
  const didMountRef = useRef(false)
  const domRef = useRef<HTMLInputElement>(null)

  const theme = React.useContext(ThemesContext)
  useEffect(() => {
    if (didMountRef.current) {
      console.log(theme)
      console.log('更新加载完毕')
    } else {
      console.log('首次加载')
      didMountRef.current = true
    }
  })
  // 当dom节点挂载 成功时候
  useEffect(() => {
    if (domRef && domRef.current) {
      domRef.current.focus()
    }
  }, [])

  useEffect(() => {
    document.title = `点击了${like}次`
  }, [like])

  const alterLike = () => {
    setTimeout(() => {
      alert('当前点击的是' + like)
    }, 3000)
  }
  return (
    <div>
      <input type="text" ref={domRef} />
      <button onClick={() => setLike(like + 1)}>{like}</button>
      <br />
      <button onClick={() => setOn(!on)}>{on ? 'ON' : 'OFF'}</button>
      <br/>
      <button onClick={alterLike}>showAlter</button>
      <br/>
      <button onClick={theme.toggleTheme}>变更Context</button>
    </div>
  )
}

export default LikeButton
