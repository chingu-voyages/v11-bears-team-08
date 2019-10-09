import React from 'react'
import styled from '@emotion/styled'
import Appointment from './Appointment'
import H2 from './H2'

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  margin-bottom: 2em;
`

const Content = styled.div`
  position: relative;
  width: 100%;
`

export default ({ data, component: Component }) => (
  <Container>
    <Content>
      {data.map((d) => (
        <Component {...d} />
      ))}
    </Content>
  </Container>
)
