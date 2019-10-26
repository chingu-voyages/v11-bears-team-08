import React, { useState, createContext } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import styled from '@emotion/styled'
import Reset from './Reset'
import Global from './Global'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Conversation from './pages/Conversation'

const Container = styled.div`
  position: relative;
  display: block;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`
export const UserContext = createContext([null, () => {}])

function App() {
  const [user, setUser] = useState(null)
  return (
    <Container>
      <Reset />
      <Global />
      <BrowserRouter>
        <UserContext.Provider value={[user, setUser]}>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/conversationTest">
            <Conversation />
          </Route>

          <Route path="/login">{user ? <Redirect to="/" /> : <Signin />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Signup />}
          </Route>
        </UserContext.Provider>
      </BrowserRouter>
    </Container>
  )
}

export default App
