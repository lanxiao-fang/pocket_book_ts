import { variablesOpt } from './variables'
import cssVars from 'css-vars-ponyfill'


export function changeTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('data-theme', theme)
  cssVars({
    watch: true,
    variables: variablesOpt[theme],
    onlyLegacy: false
  })
}

// 初始化主题
export function initTheme() {
  let theme = localStorage.getItem('data-theme') || 'light'
  changeTheme(theme)
}
