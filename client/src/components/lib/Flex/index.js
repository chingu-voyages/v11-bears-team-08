import React from 'react'
import styled from '@emotion/styled-base'

const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : 'center')};
  align-content: ${(props) => (props.align ? props.align : 'center')};
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
`

//  justify/align/direction must be a string. Ex: 'center', 'space-between', 'column'
//  each of these has a default if undefined
export default ({ children, justify, align, direction }) => (
  <Flex justify={justify} align={align} direction={direction}>
    {children}
  </Flex>
)
