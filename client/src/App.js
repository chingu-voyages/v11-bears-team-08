import React from 'react'
import styled from '@emotion/styled'
import { theme } from './utils/theme'
import Reset from './Reset'
import Global from './Global'
import Nav from './components/Nav'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

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
    {/* <Nav /> */}
    <Signup />
  </Container>
)

export default App
