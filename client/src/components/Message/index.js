import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const fadeIn = keyframes`
  0% {
    display: none;
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    display: block;
    opacity: 1;
    transform: translateY(0px);
  }
`

const Container = styled.div`
  display: flex;
  margin: 0px 0px 20px 0px;
  padding: 20px 0px;
  animation: ${fadeIn} 0.4s ease-in-out 0.5s;
`

const Avatar = styled.div`
  text-align: center;
`

const Picture = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`

const Timing = styled.div`
  font-size: 0.7em;
  font-weight: bold;
  color: #333;
`

const Text = styled.div`
  height: fit-content;
  max-width: 30vw;
  margin: 10px 0px 0px 60px;
  padding: 10px 20px;
  background-color: ${(props) => (props.me ? '#4D37F3' : '#e4e4e4')};
  border-radius: 30px;
  color: ${(props) => (props.me ? '#F8F8F8' : '#333')};
`

export default (props) => {
  const { me, avatar, date, text } = props

  return (
    <Container>
      <Avatar>
        <Picture src={avatar}></Picture>
        <Timing>{date}</Timing>
      </Avatar>
      <Text me={me}>{text}</Text>
    </Container>
  )
}
