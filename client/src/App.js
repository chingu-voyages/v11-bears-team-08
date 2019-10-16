import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import styled from '@emotion/styled'
import { theme } from './utils/theme'
import Reset from './Reset'
import Global from './Global'
import Nav from './components/Nav'
import Landing from './pages/Landing'
import Conversation from './pages/Conversation'
import UserSettings from './pages/UserSettings'

const Container = styled.div`
  position: relative;
  display: block;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`

const App = () => (
  <Container>
    <Reset />
    <Global />
    <Nav />
    <BrowserRouter>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/conversationTest">
        <Conversation />
      </Route>
      <Route path="/settings">
        <UserSettings />
      </Route>

      <Route path="/signin" render={() => <h1>We're in signin</h1>} />
      <Route path="/signup" render={() => <h1>We're in signup</h1>} />
    </BrowserRouter>
  </Container>
)

export default App
