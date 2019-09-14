import React from 'react'
import styled from '@emotion/styled'
import { theme } from './utils/theme'
import Reset from './Reset'
import Global from './Global'
import Nav from './components/Nav'

const Container = styled.div`
  position: relative;
  display: block;
  width: 100vw;
  nheight: 100%;
  min-height: 100vh;
`

export const ThemeContext = React.createContext(theme)

const App = () => (
  <ThemeContext.Provider value={theme}>
    <Reset />
    <Global />
    <Container>
      <Nav />
    </Container>
  </ThemeContext.Provider>
)

export default App
