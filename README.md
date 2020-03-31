# Hook

- [概念和特点](#概念和特点)
- [useState](#usestate)
- [useRef](#useref)
- [EffectHook](#effecthook)
- [自定义钩子](#自定义钩子)
- [useCallback](#usecallback)
- [useMemo](#usememo)
- [useContext](#usecontext)
- [useReducer](#usereducer)

### 概念和特点

1. 概念: React16.8，没有破坏性改动, 不影响前面class的使用, 且向后兼容

2. 特点:

  ```
    Hook 使你在无需修改组件结构的情况下复用状态逻辑(提供原生的方法共享状态, 避免props值传递或者高阶组件的嵌套地狱)

    Hook 加强开发体验, 减少使用状态管理库时所需要的额外抽象概念, 和来回切换组件的状况

    Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）

    Hook 则拥抱了函数, class不能很好的压缩，并且会使热重载出现不稳定的情况
  ```

3. 注意:

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
  const [fruits, setFruits] = useState(["banana", "apple"]);
  // 直接声明方法, 进行更改state
  return <button onClick={() => setFruits([...fruits, "Mango"])}>添加</button>;
};
```

- 注意点

```jsx
// hook是闭包的方式返回state, 每次更新返回的是闭包存储的值, 而不是最新值
const [count, setCount] = useState(0);
const alterCount = () => {
  setTimeout(() => {
    alert(count);
  }, 3000);
};
return (
  <>
    <button onClick={() => setCount(count + 1)}>
      {" "}
      点击count+1 : {counter}{" "}
    </button>
    <button onClick={() => alterCount}> 获取点击发生时的count </button>
  </>
);
```

### useRef

1. 概念: 相比于 state, seRef 会成为纽带, 每次获得的都是最新的, 但不会引起组件更新

- ref 访问 dom 节点

```jsx
const domRef = useRef(0);
// 当dom节点挂载 成功时候
useEffect(() => {
  if (domRef && domRef.current) {
    domRef.current.focus();
  }
}, []);
return <input type="text" ref={domRef} />;
```

- useRef 模仿实现 didMountUpdate

```jsx
const didMountRef = useRef(false);
useEffect(() => {
  if (didMountRef.current) {
    console.log("首次加载");
  } else {
    didMountRef.current = true;
  }
});
```

- ref 还可以挂载其他

```jsx
// useRef实时变化, 但并不会引起dom重新变化, 对比count变化
const countRef = useRef(0);
const [count, setCount] = useState(0);
const alterCount = () => {
  setTimeout(() => {
    alert(countRef.current);
    alert(count);
  }, 3000);
};
const handleClick = () => {
  setCount(count + 1);
  countRef.current = count + 1;
};
return (
  <>
    <button onClick={handleClick}>点击{count}</button>
    <button onClick={alterCount}> 获取点击发生时的count </button>
  </>
);
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
    const [count, setCount] = useState(0);
    // 类比componentDidUpdate, 每次更新都执行
    useEffect(() => {});
    // 类比componentDidMount，传递第二个参数为[]
    useEffect(() => {}, []);
    // 依赖变化, 执行
    useEffect(() => {
      document.title = count;
    }, [count]);
    return <button onClick={() => setCount(count + 1)}></button>;
  };
  ```

- 注意: 需要清除操作

  ```jsx
  // 计时器, 和绑定事件
  const Demo = () => {
    useEffect(() => {
      const [position, setPosition] = useState({ x: 0, y: 0 });
      const updataMouse = e => setPosition({ x: e.clientX, y: e.clientY });
      document.addEventListener("click", updatMouse);
      return () => {
        document.removeEventListener("click", updatMouse);
      };
    });
  };
  ```

### 自定义钩子

- 概念

  ```
      1. 将组件逻辑提取到可重用的函数中(例如请求封装, 监听dom宽度变化)

      2. 默认是use开头, 自定义钩子内部可用其他钩子
  ```

- 封装 api 代码

```jsx
// 自定义钩子, 封装api请求
const useURLLoader = (url: string, deps: any[] = []) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    setLoading(true);
    axios.get(url).then(result => {
      setData(result.data);
      setLoading(false);
    });
  }, deps);
  return [data, loading];
};

// 使用自定义钩子
const Demo = () => {
  // 依赖有变化, 重新请求
  const [data, loading] = useURLLoader("/api/xxx", [show]);
};
```

- 实时获取页面宽度的自定义组件

```jsx
// 自定义钩子
const useGetContentWidth = () => {
  const [size, setSize] = useState({
    width: document.body.clientWidth,
    height: document.body.clientWidth
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.body.clientWidth,
      height: document.body.clientWidth
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return size;
};
// 使用
const Demo = () => {
  const { width, height } = useGetContentWidth();
};
```

### useCallback

1. 概念: 缓存函数

- 代码使用

```jsx
const Demo = () => {
  const [count, setCount] = useState(0);
  // hook本质是函数, 每次需要重新生成handleClick
  // useCallback, 把函数缓存, 只有当, 依赖变化, 才重新返回
  const handleClick = useCallback(e => {
    setCount(count + 1);
  }, []);
  return <button onClick={handleClick}>变更count</botton>;
};
```

### useMemo

1. 概念: 缓存值, 理由与 useCallback 一致

### useContext

1. 概念: 全局数据存储

- 代码使用

1. context 的声明

```jsx
//  context.js
const themes = {
  light: {
    color: "#000",
    background: "#eee"
  },
  dark: {
    color: "#fff",
    background: "#222"
  }
};

const ThemesContext = React.createContext({
  themes: themes.light,
  toggleTheme: () => {}
});
export { ThemesContext, themes };
```

2. Provider, context 的提供者

```js
import { ThemesContext, themes } from "./context";
const App = () => {
  const { Provider } = ThemesContext;
  const toggleTheme = () => {
    if (themeItem.color === "#fff") {
      setThemeItem(themes.light);
    } else {
      setThemeItem(themes.dark);
    }
  };
  return (
    <Provider value={
      themes: themeItem,
      toggleTheme
    }>
      <Child />
    </Provider>
  );
};
```

3. Consumer, Context 的消费者

```jsx
// child.js, 点击触发更改
import { ThemesContext } from "../context";
const theme = React.useContext(ThemesContext);
console.log(theme);
return <button onClick={theme.toggleTheme}>变更Context</button>;
```

### useReducer

- 概念: useState 的替代方案, 也可替代 Redux

```jsx
import React, { useState, Fragment, useEffect, useReducer } from "react";

const initialState = { count: 0 };
// 纯函数
// 接受: 前一次的state值, 还有需要做的操作
// 返回: 返回新的state值
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

export const Hook = () => {
  // const [state, dispatch] = useReducer(reducer, initialArg, init);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
};
```
