import React from 'react'
import styled from '@emotion/styled'
import Chat from '../../components/Chat'

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
