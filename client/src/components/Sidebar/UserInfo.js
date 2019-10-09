import React from 'react'
import styled from '@emotion/styled'
import StatusIcon from './StatusIcon'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  align-self: center;
  width: 100%;
  margin: 0;
  padding: 2em 0;
  border-bottom: solid 1px white;
`

const Avatar = styled.div`
  width: 5em;
  height: 5em;
  border: solid 3px white;
  border-radius: 50%;
  overflow: hidden;

  & > * {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Info = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  width: auto;
  padding: 0 1.25em;
  h2,
  h4 {
    position: relative;
    color: white;
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  h2:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -3px;
    left: 1px;
    width: 20px;
    height: 1px;
    background: white;
  }
`

const Status = styled.div`
  display: flex;
  align-items: center;

  h4 {
    font-weight: 300;
    font-size: 0.75em;
    font-weight: 300;
    margin-right: 1em;
  }
`

export default ({ name, status }) => (
  <Container>
    <Avatar>
      <img
        src="https://images.unsplash.com/photo-1486116736668-6384736c9330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
        alt="user avatar"
      />
    </Avatar>
    <Info>
      <h2>Hi {name}!</h2>
      <Status>
        <h4>Status</h4>
        <StatusIcon status={status} />
      </Status>
    </Info>
  </Container>
)
