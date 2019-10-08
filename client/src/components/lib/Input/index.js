import React from 'react'
import styled from '@emotion/styled'
import { theme } from '../../../utils/theme'

const Container = styled.div`
  position: relative;
  margin-bottom: 1.5em;
  width: 100%;
`

const Input = styled.input`
  display: block;
  border-bottom: solid 2px ${theme.colors.hotpink};
  color: black;
  padding-bottom: 0.5em;
  padding-left: 2.25em;
  outline: none;
  width: 100%;
`

const Icon = styled.div`
  position: absolute;
  top: -3px;
  left: 0;
  width: 1em;
  img {
    max-width: 100%;
  }
`

// Icon is a render prop of an img tag with a src. but it can be anything!!
// Yaay props and generalization

export default ({ placeholder, icon, setValue }) => (
  <Container>
    <Input
      type="text"
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
    />
    <Icon>{icon}</Icon>
  </Container>
)
