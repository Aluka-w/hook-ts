import React from 'react'
interface IthemeProps {
  [key: string]: { color: string; background: string }
}
const themes: IthemeProps = {
  light: {
    color: '#000',
    background: '#eee'
  },
  dark: {
    color: '#fff',
    background: '#222'
  }
}

const ThemesContext = React.createContext({
  themes: themes.light,
  toggleTheme: () => {}
})
export { ThemesContext, themes }
