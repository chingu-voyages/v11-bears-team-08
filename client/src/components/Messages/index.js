import React, { useRef } from 'react'
import styled from '@emotion/styled'
import Message from '../Message'
import faker from 'faker'

const Container = styled.div`
  width: 90vw;
  height: 80vh;
  padding: 30px 0px;
  color: #333;
  overflow: auto;
`

export default (props) => {
  const messagesFrame = useRef(null)

  const messages = props.messages || [
    {
      me: true,
      avatar: faker.internet.avatar(),
      date: '10:00',
      text: faker.lorem.paragraph()
    },
    {
      me: false,
      avatar: faker.internet.avatar(),
      date: '10:00',
      text: faker.lorem.paragraph()
    }
  ]

  return (
    <Container className="messagesContainer" ref={messagesFrame}>
      {messages.map((message, index) => (
        <Message
          key={index}
          me={message.me}
          avatar={message.avatar}
          date={message.date}
          text={message.text}
        />
      ))}
    </Container>
  )
}
