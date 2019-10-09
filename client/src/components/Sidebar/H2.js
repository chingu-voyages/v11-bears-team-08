import React from 'react'
import styled from '@emotion/styled'

const H2 = styled.h2`
  position: relative;
  font-weight: 400;
  letter-spacing: 2px;
  color: white;
  font-size: 0.75em;
  text-transform: uppercase;
  margin-bottom: 2em;

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.5em;
    width: 20px;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
  }
`

export default ({ children }) => <H2>{children}</H2>
