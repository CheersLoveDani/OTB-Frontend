import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import Home from './components/common/Home'
import TeamDetail from './components/Teams/TeamDetail'
import Teams from './components/Teams/Teams'
import Profile from './components/auth/Profile'
import Nav from './components/common/Nav'
import theme from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/teams/:id' component={TeamDetail} />
          <Route path='/teams' component={Teams} />
          <Route path='/profile/:id' component={Profile} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider >
  )
}

export default App
