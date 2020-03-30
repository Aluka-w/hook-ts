import React from 'react'
interface IHelloProps {
  message?: string
}

// const Hello: React.FunctionComponent<IHelloProps>= (props) => {
// 别名
const Hello: React.FC<IHelloProps>= (props) => {
  return (
    <div>
      <h2>{props.message}</h2>
    </div>
  )
}
Hello.defaultProps= {
  message: 'hello'
}
export default Hello;