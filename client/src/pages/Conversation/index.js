/** @jsx jsx */
import React, { useRef, useEffect } from 'react'
import { jsx, css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import Search from '../../components/Search'
import Chat from '../../components/Chat'
import { theme } from '../../utils/theme'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`

export default () => (
  <Container>
    <Chat />
  </Container>
)
