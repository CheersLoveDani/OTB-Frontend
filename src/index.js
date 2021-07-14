import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'
import theme from './theme'
import { ColorModeScript } from '@chakra-ui/react'

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </>,
  document.getElementById('root')
)