import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 0.75em;
  border-radius: 2px;
  margin-bottom: 0.75em;
  height: 3em;
`

const Avatar = styled.div`
  border-radius: 50%;
  border: solid 2px white;
  width: 20%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Info = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: 100%;
  padding-left: 1em;
  justify-content: space-evenly;
  align-items: flex-start;
  color: white;
  h4,
  span,
  p,
  span {
    margin: 0;
    font-size: 0.75em;
  }
`

const H4 = styled.h4`
  color: hotpink;
  font-weight: 400;
`

const Description = styled.p`
  font-weight: 300;
  margin-left: 0.25em;
`
const Location = styled.span`
  font-weight: 400;
  margin-left: 0.25em;
`

const Summary = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
`

export default ({ title, description, location, avatarUrl }) => (
  <Container>
    <Avatar>
      <img src={avatarUrl} alt="" />
    </Avatar>
    <Info>
      <H4>{title}</H4>
      <Summary>
        <Description>{description}</Description>
        <Location>{location}</Location>
      </Summary>
    </Info>
  </Container>
)
