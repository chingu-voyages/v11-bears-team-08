import React from 'react'
import styled from '@emotion/styled'
import { theme } from './utils/theme'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Reset from './Reset'
import Global from './Global'
import Nav from './components/Nav'
import Conversation from './pages/Conversation'
import Landing from './pages/Landing'
import Login from './pages/Login'

const Container = styled.div`
  position: relative;
  display: block;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`

const App = () => (
  <Router>
    <Container>
      <Reset />
      <Global />
      <Nav />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Container>
  </Router>
)

export default App
