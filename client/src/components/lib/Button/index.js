import React from 'react'
import styled from '@emotion/styled'

const Button = styled.button`
  border: none;
  border-radius: 2px;
  background: blue;
  color: white;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 100%;
  height: 3em;
  outline: none;
  cursor: pointer;
`

export default ({ children, handleClick }) => (
  <Button onClick={(e) => handleClick}>{children}</Button>
)
