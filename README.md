# hook

1. 无需清除的 Effect
   绑定事件
   控制更新时间

2. 需要清除的 Effect

3. 自定义 hook
   将组件逻辑提取到可重用的函数中
   把请求封装起来, 把 loading 也包含在一起

4. useRef
   每次执行组件, 组件执行方法时候的使用闭包获取当下的那个数据, 不与其他次渲染链接
   useRef 会成为纽带, 每次获得的都是最新的, 但不会引起组件更新

```js
const alterLike = () => {
  setTimeout(() => {
    alert('当前点击的是' + like)
  }, 3000)
}
```

useRef 模仿实现 didMountUpdate

```js
useEffect(() => {
  if (didMountRef.current) {
    console.log('首次加载')
  } else {
    didMountRef.current = true
  }
})
```

访问 dom 节点

```js
// 当dom节点挂载 成功时候
useEffect(() => {
  if (domRef && domRef.current) {
    domRef.current.focus()
  }
}, [])
```

5. useContext
共享状态


6. https://usehooks.com/ react官方放的使用hook的常用