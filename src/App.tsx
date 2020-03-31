import React, { useState, useContext } from "react";
// import logo from './logo.svg'
import "./App.css";
import Hello from "./components/Hello";
import LikeButton from "./components/LikeButton";
// import MouseTracker from './components/MouseTracker'
// import useMousePosition from './hooks/useMousePosition';
import useURLLoader from "./hooks/useURLLoader";
import { ThemesContext, themes } from "./context";
interface IDog {
  message: string;
  status: string;
}

function App() {
  const [show, setShow] = useState(false);
  const [
    data,
    loading
  ] = useURLLoader("https://dog.ceo/api/breeds/image/random", [show]);
  const dogResult = data as IDog;
  // const positions = useMousePosition()
  const { Provider } = ThemesContext;
  interface IthemeProps {
    [key: string]: { color: string; background: string };
  }
  const themes: IthemeProps = {
    light: {
      color: "#000",
      background: "#eee"
    },
    dark: {
      color: "#fff",
      background: "#222"
    }
  };
  const [themeItem, setThemeItem] = useState<any>(themes.dark);
  const toggleTheme = () => {
    if (themeItem.color === "#fff") {
      setThemeItem(themes.light);
    } else {
      setThemeItem(themes.dark);
    }
  };
  const countRef = React.useRef(0);
  const [count, setCount] = useState(0);
  const alterCount = () => {
    setTimeout(() => {
      alert(countRef.current);
      alert(count)
    }, 3000);
  };
  const handleClick = () => {
    setCount(count + 1);
    countRef.current = count + 1;
  };
  return (
    <div className="App">
      <button onClick={handleClick}>点击{count}</button>
      <button onClick={alterCount}> 获取点击发生时的count </button>
      <Provider
        value={{
          themes: themeItem,
          toggleTheme
        }}
      >
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <button onClick={() => setShow(!show)}>点击</button> */}
          <Hello></Hello>
          <LikeButton></LikeButton>
          {/* {show && <MouseTracker></MouseTracker>} */}
          {/* <p>
          X: {positions.x}
          Y: {positions.y}
        </p> */}
          <button onClick={() => setShow(!show)}>重新加载dog</button>
          {loading ? (
            <p> 加载中 </p>
          ) : (
            <img src={dogResult && dogResult.message} alt="" />
          )}
        </header>
      </Provider>
    </div>
  );
}

export default App;
