import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 0.75em;
  background: white;
  border-radius: 2px;
  margin-bottom: 0.75em;
`
const Avatar = styled.div`
  border-radius: 2px;
  width: 3em;
  height: 3em;
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
  justify-content: space-between;
  align-items: flex-start;
  h4,
  span,
  p {
    margin: 0;
  }
`

const H4 = styled.h4`
  color: black;
  font-weight: 400;
  font-size: 1em;
`
const Date = styled.span`
  font-size: 0.6em;
  font-weight: 300;
  color: #999;
`
const P = styled.p`
  font-weight: 400;
  font-size: 0.6em;
  color: #555;
`

export default ({ startTime, endTime, title, coach, avatarUrl }) => (
  <Container>
    <Avatar>
      <img src={avatarUrl} alt="" />
    </Avatar>
    <Info>
      <H4>{title}</H4>
      <Date>
        {startTime} - {endTime}
      </Date>
      <P>with {coach}</P>
    </Info>
  </Container>
)
