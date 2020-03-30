# Hook

- [概念和特点](#概念和特点)
- [useState](#usestate)
- [EffectHook](#effecthook)
- [自定义钩子](#自定义钩子)
- [其他 hook](#其他hook)

### 概念和特点

1. 概念: React16.8，不编写 class 的情况下使用 state 等特性, 不再是傻瓜组件, 符合函数式编程

2. 注意:

   ```
       1. 无需修改组件结构状态下, 复用状态逻辑

       2. 在函数最外层调用 Hook, 不能在循环、条件判断或者子函数 class类中调用

       3. 不影响原先class类的使用
   ```

### useState

- 基础使用

```jsx
const Button = () => {
  // 多状态, 可以是值/引用类型
  const [fruits, setFruits] = useState(['banana', 'apple'])
  // 直接声明方法, 进行更改state
  return <button onClick={() => setFruits([...fruits, 'Mango'])}>添加</button>
}
```

- 注意点

```jsx
// hook是闭包的方式返回state, 每次更新返回的是闭包存储的值, 而不是最新值
const [count, setCount] = useState(0)
const alterCount = () => {
  setTimeout(() => {
    alert(count)
  }, 3000)
}
return (
  <>
    <button onClick={() => setCount(count + 1)}>
      {' '}
      点击count+1 : {counter}{' '}
    </button>
    <button onClick={() => alterCount}> 获取点击发生时的count </button>
  </>
)
```

### EffectHook

- 概念: 副作用钩子

  ```
      1. componentDidUpdate, componentDidMount, componentWillUnmount的综合体, 三合一

      2. useEffect返回一个函数，React 将会在执行清除操作时调用它(清除计时器等)

      3. useEffect可次调用, 便于分割各模块逻辑代码
  ```

- 基础使用

  ```jsx
  // 无需清除的Effect, api请求等
  const Demo = () => {
    // 控制执行时间
    const [count, setCount] = useState(0)
    // 类比componentDidUpdate, 每次更新都执行
    useEffect(() => {})
    // 类比componentDidMount，传递第二个参数为[]
    useEffect(() => {}, [])
    // 依赖变化, 执行
    useEffect(() => {
      document.title = count
    }, [count])
    return <button onClick={() => setCount(count + 1)}></button>
  }
  ```

- 注意: 需要清除操作

```jsx
  // 计时器, 和绑定事件
  const Demo = () => {
    useEffect(() => {
      const [position, setPosition] = useState({x: 0, y: 0})
      const updataMouse = (e) => setPosition({ x: e.clientX, y: e.clientY})
      document.addEventListener('click', updatMouse)
      return () => {
        document.removeEventListener('click', updatMouse)
      }
    })
  }
```




### 自定义钩子

- 注意

```
    1. 概念:  Custom Hook自定义钩子

    2. 默认是use开头

    3. 自定义钩子内部同样可以使用hook的钩子
```

- 代码

```jsx
// 自定义钩子
const useAge = () => {
  const [age, setAge] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setAge(20)
    }, 2000)
  })
  return age
}

// 使用自定义钩子
export default () => {
  const age = useAge()

  return <p>年龄: {age ? age : 'loading'}</p>
}
```

### 其他 hook

1. 概念: `useContext`, `useReducer`, `useCallback`, `useMemo`

2. useContext

3. useReducer(很方便使用 redux)

4. useCallback(值/函数, 类似 vue 的计算属性): 只有依赖不改变, 就不会再执行计算

5. useMemo()
